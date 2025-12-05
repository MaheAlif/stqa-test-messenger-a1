package com.ezmata.messenger.api.response;

public record GenericResponse <T> (
        String message,
        T data
){}
