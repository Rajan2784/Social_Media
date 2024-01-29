package com.rajan.fullstack.services;

import com.rajan.fullstack.model.Chat;
import com.rajan.fullstack.model.User;

import java.util.List;

public interface ChatService {
    public Chat createChat(User reqUser, User user2);

    public Chat findChatById(Integer chatId) throws Exception;

    public List<Chat> findUsersChat(Integer userID);

}
