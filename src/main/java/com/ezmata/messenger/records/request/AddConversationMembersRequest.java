package com.ezmata.messenger.records.request;

public record AddConversationMembersRequest(
        long conversationId,
        long[] newMembers
) {}
