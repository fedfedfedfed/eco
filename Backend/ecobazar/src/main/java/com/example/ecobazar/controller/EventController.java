package com.example.ecobazar.controller;

import com.example.ecobazar.entity.Event;
import com.example.ecobazar.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EventController {
    private EventService eventService;
    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }
    @GetMapping("/events")
    public List<Event> getAllEvents() {
        return eventService.findAll();
    }
    @GetMapping("/events/{eventsId}")
    public Event getEvent(@PathVariable int eventsId) {
        return eventService.findById(eventsId);
    }
    @PostMapping("/events")
    public Event addEvent(@RequestBody Event Event) {
        Event.setId(0);
        return eventService.save(Event);
    }
    @PutMapping("/events")
    public Event updateEvent(@RequestBody Event theEvent) {
        return eventService.save(theEvent);
    }
    @DeleteMapping("/events/{eventsId}")
    public String deleteEvent(@PathVariable int eventsId) {
        Event tempEvent = eventService.findById(eventsId);
        if(tempEvent == null) {
            throw new RuntimeException("Event id not found - " + eventsId);
        }
        eventService.deleteById(eventsId);
        return "Deleted event id - " + eventsId;
    }
}