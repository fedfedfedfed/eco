package com.example.ecobazar.service;

import com.example.ecobazar.entity.Blog;
import com.example.ecobazar.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {
    private BlogRepository blogRepository;
    @Autowired
    public BlogServiceImpl(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    @Override
    public List<Blog> findAll() {
        return blogRepository.findAll();
    }

    @Override
    public Blog findById(int theId) {
        Optional<Blog> blog = blogRepository.findById(theId);
        Blog theBlog = null;
        if (blog.isPresent()) {
            theBlog = blog.get();
        }
        else {
            throw new RuntimeException("Did not find event id - " + theId);
        }

        return theBlog;
    }

    @Override
    public Blog save(Blog theBlog) {
        return blogRepository.save(theBlog);
    }

    @Override
    public void deleteById(int theId) {
        blogRepository.deleteById(theId);
    }
}
