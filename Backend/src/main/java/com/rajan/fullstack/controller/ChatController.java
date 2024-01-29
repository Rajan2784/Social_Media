package com.rajan.fullstack.controller;

import com.rajan.fullstack.model.Chat;
import com.rajan.fullstack.model.User;
import com.rajan.fullstack.request.ChatRequest;
import com.rajan.fullstack.services.ChatService;
import com.rajan.fullstack.services.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ChatController {
    @Autowired
    private ChatService chatService;
    @Autowired
    private UserServiceInterface userService;

    @PostMapping("/api/chats")
    public Chat createChat(@RequestHeader("Authorization") String jwt,@RequestBody ChatRequest request) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        User user2 = userService.findUserById(request.getUserId());
        Chat chat = chatService.createChat(reqUser,user2);
        return chat;
    }

    @GetMapping("/api/chats")
    public List<Chat> findUsersChat(@RequestHeader("Authorization") String jwt){

        User user = userService.findUserByJwt(jwt);
        List<Chat> chat = chatService.findUsersChat(user.getId());
        return chat;
    }
}
