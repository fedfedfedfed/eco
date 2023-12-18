package com.example.ecobazar.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "blogs")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Getter
public class Blog {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "tag")
    private String tag;
    @Column(name = "created_by")
    private String createdBy;
    @Column(name = "comments_amount")
    private int commentsAmount;
    @Column(name = "image_url")
    private String imageUrl;
}
