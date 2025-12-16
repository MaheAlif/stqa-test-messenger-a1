package com.ezmata.messenger.records.response;

import com.ezmata.messenger.model.Message;

public record ConversationMessagesResponse(
        String message,
        long conversationId,
        Message[] messages
) {}
