package com.rajan.fullstack.services;

import com.rajan.fullstack.model.Message;
import com.rajan.fullstack.model.User;

import java.util.List;

public interface MessageService {

    public Message createMessage(User user, Integer chatId, Message message) throws Exception;

    public List<Message> findChatMessages(Integer chatId) throws Exception;

}
