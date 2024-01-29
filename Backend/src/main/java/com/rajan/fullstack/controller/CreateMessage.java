package com.rajan.fullstack.controller;

import com.rajan.fullstack.model.Message;
import com.rajan.fullstack.model.User;
import com.rajan.fullstack.services.MessageService;
import com.rajan.fullstack.services.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CreateMessage {
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserServiceInterface userService;

    @PostMapping("/api/messages/chat/{chatId}")
    public Message createMessage(@RequestHeader("Authorization")String jwt,
                                 @RequestBody Message req,
                                 @PathVariable Integer chatId
                                 ) throws Exception {

        User user = userService.findUserByJwt(jwt);
        return messageService.createMessage(user,chatId,req);

    }

    @GetMapping("/api/messages/chat/{chatId}")
    public List<Message> findChatMessage(@RequestHeader("Authorization")String jwt,
                                @PathVariable Integer chatId
    ) throws Exception {

        User user = userService.findUserByJwt(jwt);

        List<Message> messages = messageService.findChatMessages(chatId);
        return messages;

    }
}
