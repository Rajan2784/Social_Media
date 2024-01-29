package com.rajan.fullstack.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String caption;
    private String image;
    private String video;
    @OneToMany
    private List<Comment> comments = new ArrayList<>();
    @ManyToOne
    private User user;
    @ManyToMany
    private List<User> liked = new ArrayList<>();
    private LocalDateTime createdAt;

}
