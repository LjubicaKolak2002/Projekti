package com.example.kvizznanja;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.SystemClock;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.GenericTypeIndicator;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    TextView question, answer1, answer2, answer3, answer4, time;
    FirebaseAuth mAuth;
    FirebaseDatabase db;
    DatabaseReference ref;
    List<Question> randomQuestions;
    int currentQuestion = 0;
    int correctAnswers = 0;
    int selectedAnswer = -1;
    private static final long GAME_DURATION = 90000;
    private CountDownTimer countDownTimer;
    private long milliseconds = GAME_DURATION;
    private boolean isTimerRunning = false;
    private long quizStartTime;
    private long userMilliseconds;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        question = findViewById(R.id.textViewQuestion);
        answer1 = findViewById(R.id.textViewAnswer1);
        answer2 = findViewById(R.id.textViewAnswer2);
        answer3 = findViewById(R.id.textViewAnswer3);
        answer4 = findViewById(R.id.textViewAnswer4);
        time = findViewById(R.id.textViewTime);

        db = FirebaseDatabase.getInstance();
        ref = db.getReference("pitanja");
        mAuth = FirebaseAuth.getInstance();

        if (savedInstanceState != null) {
            isTimerRunning = savedInstanceState.getBoolean("isTimerRunning");
            if (isTimerRunning) {
                initializeTimer();
            }
        }
        printQuestions();
        quizStartTime = SystemClock.elapsedRealtime();
        initializeTimer();

        answer1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                checkAnswer(0);
            }
        });

        answer2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                checkAnswer(1);
            }
        });

        answer3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                checkAnswer(2);
            }
        });

        answer4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                checkAnswer(3);
            }
        });
    }

    private void printQuestions() {
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                List<Question> questions = new ArrayList<>();
                for (DataSnapshot childSnapshot : snapshot.getChildren()) {
                    String question = childSnapshot.child("pitanje").getValue(String.class);
                    List<String> answers = childSnapshot.child("odgovori").getValue(new GenericTypeIndicator<List<String>>() {});
                    int correctAnswer = childSnapshot.child("tocan_odgovor").getValue(Integer.class);

                    Question myQuestion = new Question(question, answers, correctAnswer);
                    questions.add(myQuestion);
                }

                Collections.shuffle(questions);
                randomQuestions = questions.subList(0, 10);

                Question q = randomQuestions.get(0);
                question.setText(q.getPitanje());
                answer1.setText(q.getOdgovori().get(0));
                answer2.setText(q.getOdgovori().get(1));
                answer3.setText(q.getOdgovori().get(2));
                answer4.setText(q.getOdgovori().get(3));
                countDownTimer.start();
            }
            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(MainActivity.this, "Error while getting questions!", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void checkAnswer(int selectedAnswer) {
        if (selectedAnswer == randomQuestions.get(currentQuestion).getTocanOdgovor()) {
            correctAnswers++;
            if (!isTimerRunning) {
                milliseconds += 3000;
                restartTimer();
            }
        }
        else {
            if (!isTimerRunning) {
                milliseconds -= 3000;
                restartTimer();
            }
        }
        this.selectedAnswer = selectedAnswer;
        currentQuestion++;
        if (currentQuestion < randomQuestions.size()) {
            Question q = randomQuestions.get(currentQuestion);
            question.setText(q.getPitanje());
            answer1.setText(q.getOdgovori().get(0));
            answer2.setText(q.getOdgovori().get(1));
            answer3.setText(q.getOdgovori().get(2));
            answer4.setText(q.getOdgovori().get(3));
        }
        else {
            openEndActivity();
        }
    }

    private void initializeTimer() {
        countDownTimer = new CountDownTimer(milliseconds, 1000) {
            @Override
            public void onTick(long millisUntilFinished) {
                if (!isTimerRunning) {
                    milliseconds = millisUntilFinished;
                    displayTime();
                }
            }

            @Override
            public void onFinish() {
                isTimerRunning = false;
                openEndActivity();
            }
        };
        countDownTimer.start();
    }

    private void restartTimer() {
        countDownTimer.cancel();
        initializeTimer();
    }


    private void displayTime() {
        long minutes = milliseconds / 60000;
        long seconds = (milliseconds % 60000) / 1000;
        String finalTime = String.format("%02d:%02d", minutes, seconds);
        time.setText(finalTime);
    }



    private void openEndActivity() {
        double percentage = (double) correctAnswers / randomQuestions.size() * 100;
        long quizEndTime = SystemClock.elapsedRealtime();
        userMilliseconds = quizEndTime - quizStartTime;
        long seconds = userMilliseconds / 1000;

        Intent intent = new Intent(MainActivity.this, EndActivity.class);
        intent.putExtra("correctAnswers", correctAnswers);
        intent.putExtra("percentage", percentage);
        intent.putExtra("time", seconds);
        startActivity(intent);
    }

    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putBoolean("isTimerRunning", isTimerRunning);
        outState.putLong("milliseconds", milliseconds);

        if (isTimerRunning) {
            countDownTimer.cancel();
        }
    }

    @Override
    protected void onRestoreInstanceState(@NonNull Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        isTimerRunning = savedInstanceState.getBoolean("isTimerRunning");
        if (isTimerRunning) {
            initializeTimer();
            countDownTimer.start();
        }
    }
    @Override
    protected void onPause() {
        super.onPause();
        countDownTimer.cancel();

        getPreferences(MODE_PRIVATE)
                .edit()
                .putLong("milliseconds", milliseconds)
                .putBoolean("isTimerRunning", isTimerRunning)
                .apply();
    }

    @Override
    protected void onResume() {
        super.onResume();

        SharedPreferences prefs = getPreferences(MODE_PRIVATE);
        milliseconds = prefs.getLong("milliseconds", GAME_DURATION);
        isTimerRunning = prefs.getBoolean("isTimerRunning", false);

        if (isTimerRunning) {
            initializeTimer();
            countDownTimer.start();
        }
        else {
            displayTime();
        }

        if (selectedAnswer != -1 && currentQuestion < randomQuestions.size()) {
            initializeTimer();
            countDownTimer.start();
        }
    }
}