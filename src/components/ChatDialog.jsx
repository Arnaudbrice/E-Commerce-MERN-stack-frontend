import React, { useEffect, useRef, useState } from "react";

import ChatBotImage from "../assets/images/ChatBox_image.jpg";
import avatar from "../assets/images/avatar.png";
import Markdown from "react-markdown";
import { useNavigate } from "react-router";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import { toast } from "react-toastify";

const ChatDialog = ({ isChatModalOpen, setIsChatModalOpen }) => {
  const chatDialogRef = useRef(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const dialog = chatDialogRef.current;
    if (dialog && isChatModalOpen) {
      dialog.showModal();

      const handleClose = () => setIsChatModalOpen(false);
      // add event listener to close the modal when the user clicks outside of it or clicks the close button
      dialog.addEventListener("close", handleClose);

      // cleanup function to remove the event listener when the component unmounts or when isChatModalOpen changes
      return () => {
        dialog.removeEventListener("close", handleClose);
      };
    }
  }, [isChatModalOpen, setIsChatModalOpen]);

  const handleInternalLinkClick = (event, href) => {
    event.preventDefault();

    const dialog = chatDialogRef.current;
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

    const history = messages
      .filter((msg) => msg?.text)
      .slice(-8)
      .map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

    setIsLoading(true);

    try {
      const response = await fetch(`${baseURL}/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
          history,
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
      toast.error(error?.message || "Something went wrong");
      console.error(error);
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

  const getInternalPath = (href) => {
    if (!href) return null;

    // Fall 1: Link ist bereits relativ (z.B. "/dashboard")
    if (href.startsWith("/")) return href;

    // Fall 2: Link ist absolut, gehört aber zu unserer Domain (z.B. "http://ourdomain.com/dashboard")
    try {
      const url = new URL(href);
      if (url.origin === window.location.origin) {
        /* Z.B. url.pathname → /products/iphone
        url.search →	?category=phones&price=100&brand=apple
        url.hash →	#reviews
        */
        return url.pathname + url.search + url.hash;
      }
    } catch (error) {
      /* return null; */ // Ungültige URL
      toast.error(error);
    }

    return null; // Link ist extern
  };

  return (
    <dialog
      onClick={(event) => {
        if (event.target === chatDialogRef.current) {
          chatDialogRef.current.close(); // Close the modal
        }
      }}
      id="chatModal"
      ref={chatDialogRef}
      className="modal modal-bottom sm:modal-middle flex items-center justify-center ">
      <div className="modal-box sm:w-full sm:max-w-3/4 relative bg-white text-black rounded-xl shadow-xl flex flex-col p-2 overflow-y-auto">
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
          className="flex-1  overflow-y-auto space-y-3 p-4 border-b-2 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 text-lg">
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
                  msg.sender === "user" ?
                    "bg-secondary text-white"
                  : "bg-gray-200 text-black"
                }`}>
                {/* Obwohl img zuerst definiert ist, wird es im Browser innerhalb von a angezeigt, weil das Markdown-Format es so vorgibt. Das a-Tag umschließt alles, was darin liegt – auch das Bild. Deshalb "erbt" das Bild die Klick-Funktion des Links.
                 */}
                <Markdown
                  components={{
                    // Bilder-Styling
                    img: (props) => (
                      <img
                        {...props} //Hier werden automatisch src, alt UND title eingesetzt!
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

                    // Link-Logik
                    a: ({ href, children, ...props }) => {
                      const internalPath = getInternalPath(href);

                      // 1. Wenn gar kein Link da ist, gibt's nur ein <span> mit dem Bild innerhalb
                      if (!href) {
                        return (
                          <span {...props}>
                            {/* Hier wird das <img> eingefügt! */}
                            {children}
                          </span>
                        );
                      }

                      // 2. Wenn der Link INTERN ist (nutzt handleInternalLinkClick)
                      if (internalPath) {
                        return (
                          <a
                            href={internalPath}
                            onClick={(e) =>
                              handleInternalLinkClick(e, internalPath)
                            }
                            {...props}>
                            {children}
                          </a>
                        );
                      }

                      // 3. Wenn der Link EXTERN ist (öffnet neuen Tab)
                      return (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
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
            <button className="btn btn-secondary rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mr-1 size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"></path>
              </svg>
              Ask AI
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ChatDialog;
