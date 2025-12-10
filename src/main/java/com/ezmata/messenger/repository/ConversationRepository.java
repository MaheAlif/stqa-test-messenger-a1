package com.ezmata.messenger.repository;

import com.ezmata.messenger.model.Conversation;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository {
/**
 GET /api/conversations

 GET /api/conversations/{conversationId}

 DELETE /api/conversations/{conversationId}

 GET /api/conversations/direct

 POST /api/conversations/direct

 GET /api/conversations/direct/{userId}

 GET /api/conversations/group

 POST /api/conversations/group

 PATCH /api/conversations/group/{conversationId}

 DELETE /api/conversations/group/{conversationId}

 GET /api/conversations/group/{conversationId}/members

 POST /api/conversations/group/{conversationId}/members

 DELETE /api/conversations/group/{conversationId}/members/{userId}
*/

    public List<Conversation> findByUserId(long userId);
    public Optional<Conversation> addDirectConversation(long userId1, long userId2);
    public Optional<Conversation> addGroupConversation(String name, List<Long> memberIds);
    public Optional<Conversation> get(long id);
    public Optional<List<Long>> getMembers(long conversationId);
    public Optional<Conversation> getDirectConversationBetweenUsers(long userId1, long userId2);
    public boolean updateGroupConversationName(long conversationId, String name);
    public boolean addMemberToGroupConversation(long conversationId, long userId);
    public boolean removeMemberFromGroupConversation(long conversationId, long userId);
}
