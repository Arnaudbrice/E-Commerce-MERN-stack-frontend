import React, { useEffect, useState } from "react";

import ChatBotImage from "../assets/images/ChatBox_image.jpg";
import avatar from "../assets/images/avatar.png";
import Markdown from "react-markdown";
import { useNavigate } from "react-router";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import { toast } from "react-toastify";

const ChatDialog = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInternalLinkClick = (event, href) => {
    event.preventDefault();

    const dialog = document.getElementById("chatModal");
    if (dialog?.open) {
      dialog.close();
    }

    navigate(href);
  };

  const handleMessageSubmission = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${baseURL}/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
        credentials: "include",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage =
          data?.message || "Unable to fetch a response. Please try again.";
        customErrorMessage(errorMessage, 5000);
        return;
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: trimmedMessage },
        { sender: "bot", text: data?.botResponse || "" },
      ]);

      setMessage("");
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSuggestion = () => {
    setMessage("which product can you recommend me?");
  };

  useEffect(() => {
    document.getElementById("chatModal").showModal();
  }, []);

  return (
    <dialog
      onClick={(event) => {
        if (event.target === document.getElementById("chatModal")) {
          document.getElementById("chatModal").close();
        }
      }}
      id="chatModal"
      className="modal modal-bottom sm:modal-middle flex items-center justify-center ">
      <div
        className="modal-box sm:w-full sm:max-w-3/4 relative bg-white text-black rounded-xl shadow-xl flex flex-col p-2"
        style={{ maxHeight: "90vh" }}>
        <div className="py-4">
          <h3 className="font-bold text-xl text-center text-secondary border-b-2 border-secondary">
            AI Shopping Assistent
          </h3>
          <button
            onClick={() => {
              document.getElementById("chatModal").close();
            }}
            className="btn btn-sm size-8 btn-outline btn-secondary absolute right-2 top-2">
            X
          </button>
        </div>

        <div
          id="chatMessages"
          className="flex-1 overflow-y-auto space-y-3 p-4 border-b-2 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 text-lg">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="ai avatar" src={ChatBotImage} />
              </div>
            </div>
            <div className="chat-bubble bg-gray-200 text-black">
              Hello there! I am here to help you find the best products for your
              needs. Just type in your search query and I will provide you with
              the most relevant results. How can I assist you today?
            </div>
          </div>

          {messages.map((msg, index) => (
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
                className={`chat-bubble prose prose-md white-space-pre-wrap leading-9 text-md break-words ${
                  msg.sender === "user"
                    ? "bg-secondary text-white"
                    : "bg-gray-200 text-black"
                }`}>
                <Markdown
                  components={{
                    img: ({ node, ...props }) => (
                      <img
                        {...props}
                        style={{
                          maxWidth: "200px",
                          borderRadius: "8px",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                          display: "block",
                          margin: "10px 0",
                        }}
                        loading="lazy"
                      />
                    ),
                    a: ({ node, href, children, ...props }) => {
                      if (!href) {
                        return <span {...props}>{children}</span>;
                      }

                      let internalHref = null;

                      if (href.startsWith("/")) {
                        internalHref = href;
                      } else {
                        try {
                          const parsed = new URL(href);
                          if (parsed.origin === window.location.origin) {
                            internalHref = `${parsed.pathname}${parsed.search}${parsed.hash}`;
                          }
                        } catch {
                          internalHref = null;
                        }
                      }

                      if (internalHref) {
                        return (
                          <a
                            href={internalHref}
                            onClick={(event) =>
                              handleInternalLinkClick(event, internalHref)
                            }
                            style={{
                              color: "#007bff",
                              textDecoration: "underline",
                            }}
                            {...props}>
                            {children}
                          </a>
                        );
                      }

                      return (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: "#007bff",
                            textDecoration: "underline",
                          }}
                          {...props}>
                          {children}
                        </a>
                      );
                    },
                  }}>
                  {msg.text}
                </Markdown>
              </div>
            </div>
          ))}

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

        <div className="p-3 flex flex-col gap-3">
          <button
            onClick={handleSuggestion}
            className="btn btn-outline btn-secondary rounded-lg text-sm w-2/3 sm:w-1/2">
            Bestsellers
          </button>

          <form
            className="flex items-center gap-2 w-full"
            onSubmit={handleMessageSubmission}>
            <input
              type="text"
              name="message"
              value={message}
              onChange={handleChange}
              placeholder="Type your message..."
              className="flex-1 w-full rounded-2xl input input-md input-secondary bg-white/95 text-black text-lg"
            />
            <button className="btn btn-secondary rounded-xl">Send</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ChatDialog;
