package com.ezmata.messenger.records.response;

import com.ezmata.messenger.model.User;

public record SignupResponse(
        String username,
        long userId
) {
    public SignupResponse(User user) {
        this(user.getUsername(), user.getUserId());
    }
}
