package com.ezmata.messenger.records.request;

public record SignupRequest (
        String username,
        String password,
        String email
){}
