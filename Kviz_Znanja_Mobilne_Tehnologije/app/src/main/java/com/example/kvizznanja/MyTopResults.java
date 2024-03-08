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
import java.util.Collections;
import java.util.List;

public class MyTopResults extends AppCompatActivity {
    RecyclerView recyclerView;
    CustomAdapter3 adapter;
    FirebaseDatabase db;
    DatabaseReference ref;
    FirebaseAuth mAuth;
    List<Result> results = new ArrayList<>();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_top_results);

        recyclerView = findViewById(R.id.recyclerView3);
        adapter = new CustomAdapter3(this, new ArrayList<>());
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(MyTopResults.this);
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
                Collections.sort(results, new Result.ResultComparator());
                adapter.setDataList(results);
                recyclerView.setAdapter(adapter);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(MyTopResults.this, "Error while getting user's results!", Toast.LENGTH_SHORT).show();
            }
        });
    }
}