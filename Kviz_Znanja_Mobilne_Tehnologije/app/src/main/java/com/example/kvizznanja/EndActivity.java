package com.example.kvizznanja;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.airbnb.lottie.LottieAnimationView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class EndActivity extends AppCompatActivity {

    TextView textView1, textView2, textView3;
    DatabaseReference ref;
    FirebaseDatabase db;
    FirebaseAuth mAuth;
    Button button, btnPlayAgain, logout, ranking;
    int position = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_end);

        textView1 = findViewById(R.id.textView);
        textView2 = findViewById(R.id.textView2);
        textView3 = findViewById(R.id.textViewSeconds);
        button = findViewById(R.id.buttonSaveResults);
        logout = findViewById(R.id.buttonLogout);
        btnPlayAgain = findViewById(R.id.buttonStart);
        ranking = findViewById(R.id.buttonRanking);

        db = FirebaseDatabase.getInstance();
        ref = db.getReference("rezultati");
        mAuth = FirebaseAuth.getInstance();
        FirebaseUser currentUser = mAuth.getCurrentUser();
        String userId = currentUser.getUid();

        Intent intent = getIntent();
        int correctAnswers = intent.getIntExtra("correctAnswers", 0);
        double percentage = intent.getDoubleExtra("percentage", 0);
        long time = intent.getLongExtra("time", 0);

        if (percentage < 90) {
            displayAnimation2();
        }
        else {
            displayAnimation();
        }

        textView1.setText("Number of correct answers: " + String.valueOf(correctAnswers));
        textView2.setText(String.valueOf(percentage) + "%");
        textView3.setText("Total quiz solution time: " + String.valueOf(time) + "s");

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                saveData(percentage, correctAnswers, userId, time);
            }
        });


        btnPlayAgain.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(EndActivity.this, MainActivity.class);
                startActivity(intent);
            }
        });

        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mAuth.signOut();
                Intent intent = new Intent(EndActivity.this, LoginActivity.class);
                startActivity(intent);
            }
        });

        ranking.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(EndActivity.this, RankingActivity.class);
                intent.putExtra("position", position);
                startActivity(intent);
            }
        });
    }

    public void saveData(double percentage, int correctAnswers, String userId, long time) {
        String currentDate = getCurrentDate();
        Result result = new Result(percentage, correctAnswers, userId, currentDate, time);
        result.setDatum(currentDate);

        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                long cnt = snapshot.getChildrenCount();
                ref.child(String.valueOf(cnt)).setValue(result);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(EndActivity.this, "Error while saving results", Toast.LENGTH_SHORT).show();
            }
        });
        List<Result> results = new ArrayList<>();
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                for (DataSnapshot childSnapshot: snapshot.getChildren()) {
                    Result result = childSnapshot.getValue(Result.class);
                    if (result != null) {
                        results.add(result);
                    }
                }
                position = getResultPosition(results, result);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(EndActivity.this, "Error while getting data", Toast.LENGTH_SHORT).show();

            }
        });
    }


    private String getCurrentDate() {
        SimpleDateFormat date = new SimpleDateFormat("dd/MM/yyyy");
        return date.format(new Date());
    }

    private void displayAnimation() {
        LottieAnimationView lottieAnimationView = findViewById(R.id.lottieAnimationView);
        lottieAnimationView.setVisibility(View.VISIBLE);
        lottieAnimationView.playAnimation();
    }

    private void displayAnimation2() {
        LottieAnimationView lottieAnimationView = findViewById(R.id.lottieAnimationView2);
        lottieAnimationView.setVisibility(View.VISIBLE);
        lottieAnimationView.playAnimation();
    }

    public int getResultPosition(List<Result> results, Result result) {
        Collections.sort(results, new Result.ResultComparator());
        int myPosition = Collections.binarySearch(results, result, new Result.ResultComparator());
        if (myPosition < 0) {
            return -myPosition + 1;
        }
        return myPosition + 1;
    }
}