package com.example.ecobazar.controller;

import com.example.ecobazar.entity.Testimonial;
import com.example.ecobazar.service.EventService;
import com.example.ecobazar.service.TestimonialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class TestimonialController {
    private TestimonialService testimonialService;
    @Autowired
    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }
    @GetMapping("/testimonials")
    public List<Testimonial> getAllTestimonials() {
        return testimonialService.findAll();
    }
    @GetMapping("/testimonials/{testimonialId}")
    public Testimonial getTestimonial(@PathVariable int testimonialId) {
        return testimonialService.findById(testimonialId);
    }
    @PostMapping("/testimonials")
    public Testimonial addEvent(@RequestBody Testimonial Testimonial) {
        Testimonial.setId(0);
        return testimonialService.save(Testimonial);
    }
    @PutMapping("/testimonials")
    public Testimonial updateTestimonial(@RequestBody Testimonial theEvent) {
        return testimonialService.save(theEvent);
    }
    @DeleteMapping("/testimonials/{testimonialId}")
    public String deleteTestimonial(@PathVariable int testimonialId) {
        Testimonial tempEvent = testimonialService.findById(testimonialId);
        if(tempEvent == null) {
            throw new RuntimeException("Event id not found - " + testimonialId);
        }
        testimonialService.deleteById(testimonialId);
        return "Deleted event id - " + testimonialId;
    }
}
