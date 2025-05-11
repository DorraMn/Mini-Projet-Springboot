package com.example.demo.dto;

public class AlerteStock {
    private String message;

    public AlerteStock() {}

    public AlerteStock(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
