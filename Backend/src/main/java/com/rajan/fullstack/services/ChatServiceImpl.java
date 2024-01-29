package com.rajan.fullstack.services;

import com.rajan.fullstack.model.Chat;
import com.rajan.fullstack.model.User;
import com.rajan.fullstack.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Service
public class ChatServiceImpl implements ChatService {
    @Autowired
    private ChatRepository chatRepository;
    @Override
    public Chat createChat(User reqUser, User user2) {
        Chat isExist = chatRepository.findChatByUsersId(reqUser,user2);

        if (isExist!=null){
            return isExist;
        }

        Chat chat = new Chat();
        chat.getUsers().add(user2);
        chat.getUsers().add(reqUser);
        chat.setTimeStamp(LocalDateTime.now());
        return chatRepository.save(chat);
    }

    @Override
    public Chat findChatById(Integer chatId) throws Exception {
        Optional<Chat> optional = chatRepository.findById(chatId);

        if (optional.isEmpty()){
            throw new Exception("Chat not found with id " + chatId);
        }
        return optional.get();
    }

    @Override
    public List<Chat> findUsersChat(Integer userID) {
        return chatRepository.findByUsersId(userID);
    }
}
