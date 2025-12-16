package com.ezmata.messenger.records.request;

public record MemberModificationRequest(
        long conversationId,
        long[] members
) {}
