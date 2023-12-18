package com.example.ecobazar.controller;

import com.example.ecobazar.entity.Blog;
import com.example.ecobazar.entity.Event;
import com.example.ecobazar.service.BlogService;
import com.example.ecobazar.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class BlogController {
    private BlogService blogService;
    @Autowired
    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }
    @GetMapping("/blogs")
    public List<Blog> getAllBlogs() {
        return blogService.findAll();
    }
    @GetMapping("/blogs/{blogId}")
    public Blog getBlog(@PathVariable int blogId) {
        return blogService.findById(blogId);
    }
    @PostMapping("/blogs")
    public Blog addBlog(@RequestBody Blog Blog) {
        Blog.setId(0);
        return blogService.save(Blog);
    }
    @PutMapping("/blogs")
    public Blog updateBlog(@RequestBody Blog theBlog) {
        return blogService.save(theBlog);
    }
    @DeleteMapping("/blogs/{blogId}")
    public String deleteBlog(@PathVariable int blogId) {
        Blog tempEvent = blogService.findById(blogId);
        if(tempEvent == null) {
            throw new RuntimeException("Blog id not found - " + blogId);
        }
        blogService.deleteById(blogId);
        return "Deleted blog id - " + blogId;
    }
}
