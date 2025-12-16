package com.ezmata.messenger.records.response;

public record MemberModificationResponse(
        String message,
        long conversationId,
        long[] memberIds
) {}
