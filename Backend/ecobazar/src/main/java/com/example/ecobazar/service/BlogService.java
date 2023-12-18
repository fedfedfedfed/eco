package com.example.ecobazar.service;

import com.example.ecobazar.entity.Blog;
import com.example.ecobazar.entity.Event;

import java.util.List;

public interface BlogService {
    List<Blog> findAll();

    Blog findById(int theId);

    Blog save(Blog theBlog);

    void deleteById(int theId);
}
