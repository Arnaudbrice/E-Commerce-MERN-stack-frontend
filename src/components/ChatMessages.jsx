import React, { memo, forwardRef } from "react";
import ChatBotImage from "../assets/images/ChatBox_image.jpg";
import ChatMessage from "./ChatMessage";

// Memoized messages list to isolate from input changes
// forwardRef to get ref forwarded from ChatDialog to ChatMessages to be able to scroll container to bottom on new messages (useEffect)
const ChatMessages = memo(
  forwardRef(({ messages, isLoading, mdComponents }, ref) => (
    <div
      ref={ref}
      className="flex-1 min-h-0 overflow-y-auto space-y-3 p-4 bg-gray-50
                 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {/* Greeting */}
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="ai avatar" src={ChatBotImage} />
          </div>
        </div>
        <div className="chat-bubble bg-gray-200 text-black">
          Hello there! I am here to help you find the best products for your
          needs. Just type in your search query and I will provide you with the
          most relevant results. How can I assist you today?
        </div>
      </div>

      {/* Messages */}
      {messages.map((msg, index) => (
        <ChatMessage
          key={index}
          msg={msg}
          index={index}
          mdComponents={mdComponents}
        />
      ))}

      {/* Loading indicator */}
      {isLoading && (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-8 rounded-full">
              <img alt="ai avatar" src={ChatBotImage} />
            </div>
          </div>
          <div className="chat-bubble bg-gray-200 text-black">
            <span className="loading loading-dots loading-sm"></span>{" "}
            Thinking...
          </div>
        </div>
      )}
    </div>
  )),
);

export default ChatMessages;
