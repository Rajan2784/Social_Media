package com.rajan.fullstack.services;

import com.rajan.fullstack.model.Chat;
import com.rajan.fullstack.model.Message;
import com.rajan.fullstack.model.User;
import com.rajan.fullstack.repository.ChatRepository;
import com.rajan.fullstack.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class MessageServiceImpl implements MessageService{
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ChatService chatService;
    @Autowired
    private ChatRepository chatRepository;
    @Override
    public Message createMessage(User user, Integer chatId, Message req) throws Exception {
        Message message = new Message();

        Chat chat = chatService.findChatById(chatId);
        message.setChat(chat);
        message.setContent(req.getContent());
        message.setUser(user);
        message.setTimeStamp(LocalDateTime.now());

        Message savedMessage = messageRepository.save(message);
        chat.getMessages().add(savedMessage);
        chatRepository.save(chat);
        return savedMessage;
    }

    @Override
    public List<Message> findChatMessages(Integer chatId) throws Exception {
        Chat chat = chatService.findChatById(chatId);
        return messageRepository.findByChatId(chatId);
    }
}
