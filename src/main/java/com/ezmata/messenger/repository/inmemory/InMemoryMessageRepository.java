package com.ezmata.messenger.repository.inmemory;

import com.ezmata.messenger.model.Message;
import com.ezmata.messenger.repository.MessageRepository;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Repository
public class InMemoryMessageRepository implements MessageRepository {
    private final Map<Long, List<Message>> messages = new HashMap<>();
    private final AtomicInteger nextId = new AtomicInteger(1001);
    @Override
    public Optional<List<Message>> getMessagesForConversation(long conversationId) {
        return Optional.ofNullable(messages.get(conversationId));
    }

    @Override
    public Optional<List<Message>> sendMessage(long conversationId, long senderId, String content) {
        if(messages.containsKey(conversationId)) {
            messages.get(conversationId).add(new Message(
                    nextId.getAndIncrement(),
                    conversationId,
                    senderId,
                    content,
                    System.currentTimeMillis()
            ));
        }else{
            messages.put(conversationId, List.of(new Message(
                    nextId.getAndIncrement(),
                    conversationId,
                    senderId,
                    content,
                    System.currentTimeMillis()
            )));
        }
        return Optional.ofNullable(messages.get(conversationId));
    }
}
