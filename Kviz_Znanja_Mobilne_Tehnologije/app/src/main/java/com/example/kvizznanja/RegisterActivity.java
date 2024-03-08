package com.example.kvizznanja;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap;
import java.util.Map;

public class RegisterActivity extends AppCompatActivity {
    Button register;
    EditText email, password, username;
    FirebaseAuth mAuth;
    FirebaseDatabase db;
    DatabaseReference ref;
    TextView login;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        register = findViewById(R.id.buttonRegister);
        email = findViewById(R.id.registerEmail);
        username = findViewById(R.id.editTextUsername);
        password = findViewById(R.id.registerPassword);
        login = findViewById(R.id.textView6);
        mAuth = FirebaseAuth.getInstance();
        db = FirebaseDatabase.getInstance();
        ref = db.getReference("korisnici");

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                createAccount();
            }
        });

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                startActivity(intent);
            }
        });
    }

    void createAccount() {
        String userEmail = email.getText().toString();
        String userPassword = password.getText().toString();
        String userName = username.getText().toString();
        if (TextUtils.isEmpty(userEmail) || TextUtils.isEmpty(userPassword) || TextUtils.isEmpty(userName)) {
            Toast.makeText(RegisterActivity.this, "You must input username, email and password", Toast.LENGTH_SHORT).show();
        }
        else {
            mAuth.createUserWithEmailAndPassword(userEmail, userPassword)
                    .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(@NonNull Task<AuthResult> task) {
                            if (task.isSuccessful()) {
                                FirebaseUser user = mAuth.getCurrentUser();
                                String userId = user.getUid();
                                String email = user.getEmail();
                                saveUser(userId, email, userName);

                                Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                                startActivity(intent);
                            }
                            else {
                                Toast.makeText(RegisterActivity.this, "Registration failed", Toast.LENGTH_SHORT).show();
                            }
                        }
                    });
        }
    }

    void saveUser(String userId, String email, String username) {
        ref = db.getReference("korisnici");

        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                int nextKey = (int) snapshot.getChildrenCount();
                Map<String, Object> userMap = new HashMap<>();
                userMap.put("user_id", userId);
                userMap.put("email", email);
                userMap.put("username", username);
                ref.child(String.valueOf(nextKey)).setValue(userMap);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(RegisterActivity.this, "Error while saving user!", Toast.LENGTH_SHORT).show();
            }
        });
    }
}