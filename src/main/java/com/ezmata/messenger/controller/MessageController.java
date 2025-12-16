package com.ezmata.messenger.controller;

import com.ezmata.messenger.model.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MessageController {
//    this will by default return last 20 messages, if params are added for pagination, it can return accordingly
//    add appropriate parameters
    @GetMapping("/messages/{conversationId}/get")
    public ResponseEntity<?> getMessages(Authentication authentication,
                                      @PathVariable String conversationId,
                                      @RequestParam(required = false, defaultValue = "0") int page,
                                      @RequestParam(required = false, defaultValue = "20") int size) {
        String username = authentication.getName();
        try{
//            TODO: MessageService getMessages;
            return ResponseEntity.ok(List.<Message>of());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }


    @PostMapping("/messages/{conversationId}/send")
    public ResponseEntity<?> sendMessage(Authentication authentication,
                                            @PathVariable String conversationId,
                                            @RequestBody String content) {
        String username = authentication.getName();
        try{
//            TODO: MessageService sendMessage;
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
