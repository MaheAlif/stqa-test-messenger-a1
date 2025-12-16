package com.ezmata.messenger.records.response;

public record LoginResponse(
        String token,
        long userId
) {}
