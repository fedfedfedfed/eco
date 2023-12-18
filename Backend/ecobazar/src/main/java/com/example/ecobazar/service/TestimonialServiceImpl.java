package com.example.ecobazar.service;

import com.example.ecobazar.entity.Testimonial;
import com.example.ecobazar.repository.TestimonialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestimonialServiceImpl implements TestimonialService {
    private TestimonialRepository testimonialRepository;

    @Autowired
    public TestimonialServiceImpl(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    @Override
    public List<Testimonial> findAll() {
        return testimonialRepository.findAll();
    }

    @Override
    public Testimonial findById(int theId) {
        Optional<Testimonial> chef = testimonialRepository.findById(theId);
        Testimonial theChef = null;
        if (chef.isPresent()) {
            theChef = chef.get();
        }
        else {
            throw new RuntimeException("Did not find testimonial id - " + theId);
        }

        return theChef;
    }

    @Override
    public Testimonial save(Testimonial theChef) {
        return testimonialRepository.save(theChef);
    }

    @Override
    public void deleteById(int theId) {
        testimonialRepository.deleteById(theId);
    }
}
