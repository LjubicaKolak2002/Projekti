package com.example.kvizznanja;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;

public class UserResultsAcivity extends AppCompatActivity {
    CustomAdapter adapter;
    RecyclerView recyclerView;
    FirebaseDatabase db;
    DatabaseReference ref;
    FirebaseAuth mAuth;

    List <Result> results = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_results_acivity);

        recyclerView = findViewById(R.id.recyclerView);
        adapter = new CustomAdapter(this, new ArrayList<>());
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(UserResultsAcivity.this);
        recyclerView.setLayoutManager(layoutManager);

        db = FirebaseDatabase.getInstance();
        ref = db.getReference("rezultati");
        mAuth = FirebaseAuth.getInstance();

        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                for (DataSnapshot childSnapshot : snapshot.getChildren()) {
                    Result result = childSnapshot.getValue(Result.class);
                    if (result != null && mAuth.getCurrentUser().getUid().equals(result.getUser_id())) {
                        results.add(result);
                    }
                }
                adapter.setDataList(results);
                recyclerView.setAdapter(adapter);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(UserResultsAcivity.this, "Error while getting user's results!", Toast.LENGTH_SHORT).show();
            }
        });
    }
}