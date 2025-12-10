package com.ezmata.messenger.repository.inmemory;

import com.ezmata.messenger.model.Conversation;
import com.ezmata.messenger.repository.ConversationRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public class InMemoryConversationRepository implements ConversationRepository {
    private final Map<Long, Conversation> conversations = new ConcurrentHashMap<>();
    private final Map<Long, List<Long>> members = new ConcurrentHashMap<>();

    private AtomicLong nextId = new AtomicLong(201);

    @Override
    public List<Conversation> getAll() {
        return List.copyOf(conversations.values());
    }

    @Override
    public Conversation add(Conversation conversation) {
        long id = nextId.getAndIncrement();
        Conversation newConversation = new Conversation(id, conversation.getName(), conversation.getType());
        conversations.put(id, newConversation);
        return newConversation;
    }

    @Override
    public Optional<Conversation> get(long id) {
        return Optional.empty();
    }

    @Override
    public Optional<List<Long>> getMembers(long conversationId) {
        return Optional.empty();
    }

    @Override
    public boolean addMember(long conversationId, long userId) {
        return false;
    }

    @Override
    public boolean removeMember(long conversationId, long userId) {
        return false;
    }
}
