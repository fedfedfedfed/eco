package com.example.ecobazar.service;

import com.example.ecobazar.entity.Event;

import java.util.List;

public interface EventService {
    List<Event> findAll();

    Event findById(int theId);

    Event save(Event theChef);

    void deleteById(int theId);
}