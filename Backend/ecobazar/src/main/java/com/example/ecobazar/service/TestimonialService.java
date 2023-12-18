package com.example.ecobazar.service;

import com.example.ecobazar.entity.Product;
import com.example.ecobazar.entity.Testimonial;

import java.util.List;

public interface TestimonialService {
    List<Testimonial> findAll();
    Testimonial findById(int theId);
    Testimonial save(Testimonial theTestimonial);
    void deleteById(int theId);
}
