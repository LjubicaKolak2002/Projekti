package com.example.kvizznanja;

public class User {
    private String user_id;
    private String email;
    private String username;

    public User() {}

    public User(String email, String user_id, String username) {
        this.email = email;
        this.user_id = user_id;
        this.username = username;
    }

    public void setId(String user_id) {
        this.user_id = user_id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUser_id() {
        return user_id;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }
}
