package com.ezmata.messenger.records.request;

import java.util.List;

public record CreateConversationRequest (
    String type,
    String name,
    long[] memberIds
) {
    public boolean isGroup() {
        return "GROUP".equalsIgnoreCase(type);
    }

    public List<Long> getMembersList() {
        return memberIds != null ? java.util.Arrays.stream(memberIds).boxed().toList() : java.util.Collections.emptyList();
    }
}
