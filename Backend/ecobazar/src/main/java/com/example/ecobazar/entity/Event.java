package com.example.ecobazar.entity;

import com.example.ecobazar.entity.enums.EventType;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "event_name")
    private String eventName;

    @Column(name = "event_type")
    @Enumerated(EnumType.STRING)
    private EventType eventType;
    @Column(name = "event_date")
    private Date dateTime;
    @Column(name = "location")
    private String location;
    @Column(name = "description")
    private String description;
    @Column(name = "organiser")
    private String organizer;
    @Column(name = "attendees_amount")
    private int attendeesAmount;

    public Event() {}

    public Event(String imageUrl, String eventName, EventType eventType, Date dateTime, String location, String description, String organizer, int attendeesAmount) {
        this.imageUrl = imageUrl;
        this.eventName = eventName;
        this.eventType = eventType;
        this.dateTime = dateTime;
        this.location = location;
        this.description = description;
        this.organizer = organizer;
        this.attendeesAmount = attendeesAmount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public EventType getEventType() {
        return eventType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOrganizer() {
        return organizer;
    }

    public void setOrganizer(String organizer) {
        this.organizer = organizer;
    }

    public int getAttendeesAmount() {
        return attendeesAmount;
    }

    public void setAttendeesAmount(int attendeesAmount) {
        this.attendeesAmount = attendeesAmount;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", imageUrl='" + imageUrl + '\'' +
                ", eventName='" + eventName + '\'' +
                ", eventType=" + eventType +
                ", dateTime=" + dateTime +
                ", location='" + location + '\'' +
                ", description='" + description + '\'' +
                ", organizer='" + organizer + '\'' +
                ", attendeesAmount=" + attendeesAmount +
                '}';
    }
}
