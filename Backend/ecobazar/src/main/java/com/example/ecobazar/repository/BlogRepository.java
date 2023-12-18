package com.example.ecobazar.repository;

import com.example.ecobazar.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog, Integer> {

}
