import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getUserDetails } from "../../Services/LoginService";
import "./ChatMessage.css";
import { useNavigate } from "react-router-dom";

let stompClient = null;

const ChatMessage = () => {

  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // ✅ Fetch user & connect
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        const user =
          response.data?.username ||
          response.data?.name ||
          response.data;

        if (user) {
          setUsername(user);
          connect(user); // 🔥 connect here
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();

    return () => {
      if (stompClient) {
        console.log("Disconnecting...");
        stompClient.deactivate();
        stompClient = null;
      }
    };
  }, []);

  // ✅ CONNECT FUNCTION (FIXED)
  const connect = (autoName) => {
    if (!autoName) return;

    if (stompClient && stompClient.active) {
      console.log("Already connected");
      return;
    }

    const socket = new SockJS("http://localhost:9595/lostfound/ws");

    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("✅ Connected to WebSocket");
        setConnected(true);

        // Register user
        stompClient.publish({
          destination: "/app/register",
          body: JSON.stringify({ sender: autoName }),
        });

        // Subscribe to messages
        stompClient.subscribe("/topic/messages", (payload) => {
          const msg = JSON.parse(payload.body);
          console.log("RECEIVED MESSAGE:", msg);
          setMessages((prev) => [...prev, msg]);
        });

        // Subscribe to users
        stompClient.subscribe("/topic/users", (payload) => {
          const list = JSON.parse(payload.body);
          setUsers(list);
        });
      },

      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
      },
    });

    stompClient.activate();
  };

  // ✅ SEND MESSAGE
  const sendMessage = () => {
    if (!stompClient?.connected) {
      console.warn("Not connected");
      return;
    }

    if (!input.trim()) return;

    const msg = { sender: username, content: input };

    stompClient.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify(msg),
    });

    setInput("");
  };

  // ✅ BACK NAVIGATION (role-based)
  const returnBack = () => {
    if (role === "Admin") navigate("/admin-menu");
    else navigate("/student-menu");
  };

  // ✅ LOADING UI
  if (loading) {
    return (
      <div className="loading-screen">
        <h3>Loading user details...</h3>
      </div>
    );
  }

 return (
  <div className="chat-container">

    {/* HEADER */}
    <div className="chat-header">
      <h2>💬 Chat Room</h2>
      <span className="status">
        {connected ? "🟢 Connected" : "🔴 Disconnected"}
      </span>
    </div>

    {/* MAIN */}
    <div className="chat-main">

      {/* LEFT: CHAT AREA */}
      <div className="chat-left">

        {/* MESSAGES */}
        <div className="messages">
          {messages.length === 0 ? (
            <p className="no-msg">No messages yet...</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === username ? "self" : "other"
                }`}
              >
                <span className="sender">{msg.sender}</span>
                <span className="text">{msg.content}</span>
              </div>
            ))
          )}
        </div>

        {/* INPUT */}
        <div className="input-area">
          <input
            type="text"
            value={input}
            placeholder="Type a message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>

      </div>

      {/* RIGHT: USERS */}
      <div className="sidebar">
        <h3>🟢 Online Users</h3>

        {users && users.length > 0 ? (
          users.map((user, i) => (
            <div key={i} className="user-item">
              <span className="dot"></span>
              {user}
            </div>
          ))
        ) : (
          <p className="no-user">No users online</p>
        )}

        <button className="back-btn" onClick={returnBack}>
          ⬅ Back
        </button>
      </div>

    </div>
  </div>
);

};

export default ChatMessage;