package com.example.ecobazar.service;

import com.example.ecobazar.entity.Event;
import com.example.ecobazar.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {
    private EventRepository eventRepository;
    @Autowired
    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    @Override
    public Event findById(int theId) {
        Optional<Event> event = eventRepository.findById(theId);
        Event theEvent = null;
        if (event.isPresent()) {
            theEvent = event.get();
        }
        else {
            throw new RuntimeException("Did not find event id - " + theId);
        }

        return theEvent;
    }

    @Override
    public Event save(Event theChef) {
        return eventRepository.save(theChef);
    }

    @Override
    public void deleteById(int theId) {
        eventRepository.deleteById(theId);
    }
}