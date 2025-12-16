package com.ezmata.messenger.service;

import com.ezmata.messenger.model.Conversation;
import com.ezmata.messenger.model.ConversationType;
import com.ezmata.messenger.model.Message;
import com.ezmata.messenger.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final ConversationService conversationService;
    private final UserService userService;

    public MessageService(MessageRepository messageRepository, ConversationService conversationService, UserService userService) {
        this.messageRepository = messageRepository;
        this.conversationService = conversationService;
        this.userService = userService;
    }

    public List<Message> getMessagesForConversation(String username, long conversationId) {
        try{
            Conversation conversation = conversationService.getConversationById(username, conversationId);
            try{
                return messageRepository.getMessagesForConversation(conversationId).orElse(new ArrayList<Message>());
            }catch (Exception e){
                throw new IllegalArgumentException("Failed to retrieve messages for this conversation: " + e.getMessage());
            }
        }catch (IllegalArgumentException e){
            throw new IllegalArgumentException("Cannot access messages for this conversation: " + e.getMessage());
        }
    }

    public List<Message> sendMessageToConversation(String username, long conversationId, String content) {
        Conversation conversation = conversationService.getConversationById(username, conversationId);
        System.out.println("SendMessageController::UserName: " + username + "ConversationId: " + conversationId + ", Content: " + content);
        long senderId = userService.getByUsername(username).get().getUserId();
        System.out.println("\tSenderId: " + senderId);
        if(conversation.getType() == ConversationType.DIRECT){
            System.out.println("\tDirect Conversation");
            long receiverId = conversationService.getOtherParticipantId(conversationId, senderId);
            System.out.println("\t\tReceiverId: " + receiverId);
            if(userService.isUserBlockedBy(receiverId, senderId)){
                throw new IllegalArgumentException("You must unblock the user to send messages");
            }
            if(!userService.isUserBlockedBy(senderId, receiverId)){
                try{
                    return messageRepository.sendMessage(conversationId, senderId, content).orElse(new ArrayList<Message>());
                }catch (Exception e){
                    throw new IllegalArgumentException("Failed to send message to this conversation: "+ e.getMessage());
                }
            }else{
                throw new IllegalArgumentException("You cannot send message to this conversation");
            }
        }else{
            System.out.println("\tGroup Conversation");
            try{
                System.out.println("\t\tSending message to group conversation");
                return messageRepository.sendMessage(conversationId, senderId, content).orElse(new ArrayList<Message>());
            }catch (Exception e){
                System.out.println("\t\tFailed to send message: " + e.getMessage());
                throw new IllegalArgumentException("Failed to send message to this conversation:" + e.getMessage());
            }
        }
    }
}
