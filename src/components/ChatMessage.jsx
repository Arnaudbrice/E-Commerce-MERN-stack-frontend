import React, { memo } from "react";
import ChatBotImage from "../assets/images/ChatBox_image.jpg";
import avatar from "../assets/images/avatar.png";
import Markdown from "react-markdown";

// Memoized individual message component to prevent image re-rendering
const ChatMessage = memo(({ msg, index, mdComponents }) => (
  <div
    key={index}
    className={`chat ${msg.sender === "user" ? "chat-end" : "chat-start"}`}>
    <div className="chat-image avatar">
      <div className="w-8 rounded-full">
        <img
          src={msg.sender === "user" ? avatar : ChatBotImage}
          alt={msg.sender}
        />
      </div>
    </div>
    <div
      className={`chat-bubble prose prose-md leading-9 text-md break-words ${
        msg.sender === "user" ?
          "bg-secondary text-white"
        : "bg-gray-200 text-black"
      }`}>
      <Markdown components={mdComponents}>{msg.text}</Markdown>
    </div>
  </div>
));

export default ChatMessage;
