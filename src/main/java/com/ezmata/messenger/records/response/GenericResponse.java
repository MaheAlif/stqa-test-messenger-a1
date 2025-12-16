package com.ezmata.messenger.records.response;

public record GenericResponse <T> (
        String message,
        T data
){}
