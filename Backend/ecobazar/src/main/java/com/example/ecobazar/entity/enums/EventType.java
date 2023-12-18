package com.example.ecobazar.entity.enums;

public enum EventType {
    ONSITE("Onsite"),
    ONLINE("Online");

    private final String value;

    public String getValue() {
        return value.toUpperCase();
    }

    EventType(String value) {
        this.value = value.toUpperCase();
    }
}
