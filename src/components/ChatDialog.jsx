import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import { toast } from "react-toastify";
import ChatMessages from "./ChatMessages.jsx";

const ChatDialog = ({ isChatModalOpen, setIsChatModalOpen }) => {
  const chatMessagesRef = useRef(null);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Lock modal height in pixels when it opens so the mobile keyboard
  //    cannot shrink the modal (vh/dvh units change when keyboard appears).
  const [lockedHeight, setLockedHeight] = useState(null);

  useEffect(() => {
    if (isChatModalOpen) {
      // Capture the viewport height ONCE when the modal opens
      const vh =
        window.visualViewport?.height ?? document.documentElement.clientHeight;
      setLockedHeight(Math.floor(vh * 0.7)); // 80 % of viewport in px ( so the modal will not shrink when keyboard appears)
    } else {
      setLockedHeight(null);
    }
  }, [isChatModalOpen]);

  // Auto-scroll to the latest message
  useEffect(() => {
    const container = chatMessagesRef.current;
    if (container) {
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  }, [messages, isLoading]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsChatModalOpen(false);
    };
    if (isChatModalOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isChatModalOpen, setIsChatModalOpen]);

  // Get the internal path for navigation links (e.g. /dashboard)
  const handleInternalLinkClick = useCallback(
    (event, href) => {
      event.preventDefault();
      setIsChatModalOpen(false);
      navigate(href);
    },
    [navigate, setIsChatModalOpen],
  );

  const handleMessageSubmission = async (event) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    const history = messages
      .filter((msg) => msg?.text)
      .slice(-8)
      .map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

    setMessages((prev) => [...prev, { sender: "user", text: trimmedMessage }]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${baseURL}/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedMessage, history }),
        credentials: "include",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        customErrorMessage(
          data?.message || "Unable to fetch a response.",
          5000,
        );
        return;
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data?.botResponse || "" },
      ]);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => setMessage(event.target.value);

  const handleSuggestion = () =>
    setMessage("which product can you recommend me?");

  // Get the internal path for navigation links (e.g. /dashboard)
  const getInternalPath = useCallback((href) => {
    if (!href) return null;
    if (href.startsWith("/")) return href;
    try {
      const url = new URL(href);
      if (url.origin === window.location.origin) {
        return url.pathname + url.search + url.hash;
      }
    } catch {
      return null;
    }
    return null;
  }, []);

  // useMemo returns the SAME object reference between renders.
  //    useMemo cached immediately the object itself, so it can be used in dependencies of other hooks without causing re-renders.
  const mdComponents = useMemo(
    () => ({
      img: (props) => (
        <img
          {...props}
          style={{
            maxWidth: "200px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "block",
            margin: "5px auto",
          }}
          loading="lazy"
        />
      ),
      a: ({ href, children, ...props }) => {
        const internalPath = getInternalPath(href);
        if (!href) return <span {...props}>{children}</span>;
        if (internalPath) {
          return (
            <a
              href={internalPath}
              onClick={(e) => handleInternalLinkClick(e, internalPath)}
              {...props}>
              {children}
            </a>
          );
        }
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        );
      },
    }),
    [getInternalPath, handleInternalLinkClick],
  );

  // Don't render anything when closed
  if (!isChatModalOpen) return null;

  return (
    /* ─── Fullscreen overlay container ─── */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/10"
        onClick={() => setIsChatModalOpen(false)}
      />

      {/* ─── Modal ─── */}
      {/* Height is locked in pixels so the mobile keyboard cannot shrink it */}
      <div
        className="relative bg-white w-full max-w-3xl rounded-xl shadow-xl flex flex-col overflow-hidden"
        style={{ maxHeight: lockedHeight ? `${lockedHeight}px` : "70vh" }}>
        {/* 70vh for devices with screen higher than phone height */}
        {/* ── Header (never shrinks) ── */}
        <div className="flex items-center justify-between p-3 border-b shrink-0">
          <h3 className="font-bold text-xl text-secondary">
            AI Shopping Assistent
          </h3>
          <button
            onClick={() => setIsChatModalOpen(false)}
            className="btn btn-sm btn-outline btn-secondary"
            aria-label="Close chat">
            ✕
          </button>
        </div>

        {/***********Chat messages (scrollable, takes remaining space) ***********/}
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          mdComponents={mdComponents}
          ref={chatMessagesRef}
        />

        {/* ── Footer (never shrinks) ── */}
        <div className="p-3 flex flex-col gap-3 shrink-0 border-t">
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
            <button
              type="submit"
              className="btn btn-secondary rounded-xl"
              disabled={isLoading}>
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
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>
              Ask AI
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatDialog;
