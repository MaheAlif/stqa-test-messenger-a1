package com.ezmata.messenger.service;

import com.ezmata.messenger.model.Message;
import com.ezmata.messenger.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {
    private UserService userService;
    private MessageRepository messageRepository;

    public MessageService(UserService userService, MessageRepository messageRepository) {
        this.userService = userService;
        this.messageRepository = messageRepository;
    }

    public List<Message> getMessagesForConversation(String username, long conversationId) {
        // Implementation to retrieve messages for a conversation
        return new ArrayList<Message>();
    }

    public List<Message> sendMessageToConversation(String username, long conversationId, String content) {

        return new ArrayList<Message>();
    }
}
