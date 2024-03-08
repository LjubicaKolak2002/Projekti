package com.example.kvizznanja;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

public class RankingActivity extends AppCompatActivity {
    TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ranking);

        textView = findViewById(R.id.textView13);
        Intent intent = getIntent();
        int position = intent.getIntExtra("position", 1);
        textView.setText("Ovo je " + String.valueOf(position) + ". najbolji ostvareni rezultat do sada.");
    }
}