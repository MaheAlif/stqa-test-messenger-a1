package com.ezmata.messenger.api.request;

public record UserUpdateRequest (
        Long id,
        String username,
        String email,
        String password
) {}
