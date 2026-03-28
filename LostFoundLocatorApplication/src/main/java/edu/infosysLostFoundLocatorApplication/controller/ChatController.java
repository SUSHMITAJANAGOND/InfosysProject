package edu.infosysLostFoundLocatorApplication.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosysLostFoundLocatorApplication.bean.ChatMessage;

@RestController
@RequestMapping("/lostfound/")
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // Online users
    private final Set<String> onlineUsers = Collections.synchronizedSet(new HashSet<>());

    // map sessionId -> username
    private final Map<String, String> sessionIdToUser = Collections.synchronizedMap(new HashMap<>());

    @GetMapping("/users")
    public Set<String> getOnlineUsers() {
        return onlineUsers;
    }

    @MessageMapping("/register")
    public void register(ChatMessage message, StompHeaderAccessor headerAccessor) {

        String sessionId = headerAccessor.getSessionId();
        String username = message.getSender();

        if (username != null && !username.trim().isEmpty()) {
            onlineUsers.add(username);
            sessionIdToUser.put(sessionId, username);
            broadcastUserList();
        }
    }

    
    // WebSocket
    @MessageMapping("/sendMessage")
    public void sendMessage(ChatMessage message) {
        messagingTemplate.convertAndSend("/topic/messages", message);
    }
    
    public void removeUser(String sessionId) {
    	String username = sessionIdToUser.get(sessionId);
    	if(username != null) {
    		onlineUsers.remove(username);
    		sessionIdToUser.remove(sessionId);
    		broadcastUserList();
    	}
    }
    
    
    
    private void broadcastUserList() {
        messagingTemplate.convertAndSend("/topic/users", onlineUsers);
    }
}