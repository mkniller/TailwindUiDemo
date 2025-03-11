import React, { useState, useRef, useEffect } from "react";
import { ContextOptions } from "./types/types";
import { ChatLayout } from "./layouts/ChatLayout";
import { ChatMessage, SystemMessage } from "./components/ChatMessage";

// Message interface
interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
}

export default function App() {
  // State for context selection
  const [selectedContext, setSelectedContext] = useState<ContextOptions>(
    ContextOptions.policies
  );

  // State for input field
  const [inputValue, setInputValue] = useState("");

  // State for chat messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `Welcome to the ${ContextOptions.policies} chatbot. How can I help you today?`,
      timestamp: new Date(),
      isUser: false,
    },
  ]);

  // Ref for scrolling to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle context change
  const handleContextChange = (value: ContextOptions) => {
    setSelectedContext(value);

    // Add a system message about the context change
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: `Switched to ${value} context`,
        timestamp: new Date(),
        isUser: false,
      },
    ]);

    // Add a welcome message for the new context
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: `Welcome to the ${value} chatbot. How can I help you today?`,
          timestamp: new Date(),
          isUser: false,
        },
      ]);
    }, 500);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle send message
  const handleSendMessage = (message: string) => {
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date(),
      isUser: true,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue(""); // Clear input field

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `This is a simulated response from the ${selectedContext} chatbot to your message: "${message}"`,
        timestamp: new Date(),
        isUser: false,
      };

      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <ChatLayout
      contextOptions={ContextOptions}
      selectedContext={selectedContext}
      onContextChange={handleContextChange}
      onSendMessage={handleSendMessage}
      inputValue={inputValue}
      onInputChange={handleInputChange}
    >
      {/* Render chat messages */}
      {messages.map((message) =>
        message.isUser ? (
          <ChatMessage
            key={message.id}
            content={message.content}
            timestamp={message.timestamp}
            isUser={true}
          />
        ) : message.content.includes("Switched to") ? (
          <SystemMessage key={message.id} content={message.content} />
        ) : (
          <ChatMessage
            key={message.id}
            content={message.content}
            timestamp={message.timestamp}
            isUser={false}
          />
        )
      )}
      <div ref={messagesEndRef} />
    </ChatLayout>
  );
}
