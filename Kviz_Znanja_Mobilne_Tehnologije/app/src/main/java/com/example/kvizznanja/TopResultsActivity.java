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

public class TopResultsActivity extends AppCompatActivity {
    CustomAdapter2 adapter;
    RecyclerView recyclerView;
    FirebaseAuth mAuth;
    FirebaseDatabase db;
    DatabaseReference ref;
    private List<Result> results = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_top_results);

        mAuth = FirebaseAuth.getInstance();
        recyclerView = findViewById(R.id.recyclerView2);
        adapter = new CustomAdapter2(this, new ArrayList<>());
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(TopResultsActivity.this);
        recyclerView.setLayoutManager(layoutManager);

        db = FirebaseDatabase.getInstance();
        ref = db.getReference("rezultati");

        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                for (DataSnapshot childSnapshot : snapshot.getChildren()) {
                    Result result = childSnapshot.getValue(Result.class);
                    if (result != null) {
                        results.add(result);
                    }
                }

                Collections.sort(results, new Result.ResultComparator());
                if (results.size() < 10) {
                    List<Result> topResults = results.subList(0, results.size());
                    adapter.setDataList(topResults);
                }
                else {
                    List<Result> topResults = results.subList(0, 10);
                    adapter.setDataList(topResults);
                }
                recyclerView.setAdapter(adapter);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(TopResultsActivity.this, "Error while getting results!", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
