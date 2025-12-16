package com.ezmata.messenger.records.request;

public record UserUpdateRequest (
        Long id,
        String username,
        String email,
        String password
) {}
