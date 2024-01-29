package com.rajan.fullstack.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String chat_name;

    private String chat_image;
    @ManyToMany
    private List<User> users = new ArrayList<>();

    private LocalDateTime timeStamp;
    @OneToMany(mappedBy = "chat")
    private List<Message> messages = new ArrayList<>();
}
