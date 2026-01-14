import React, { useEffect, useState } from 'react'


import ChatBotImage from "../assets/images/ChatBox_image.jpg";

const ChatDialog = () => {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const handleMessageSubmission = (e) => {
    e.preventDefault()
    setMessage('')
  }

  useEffect(() => {
     document.getElementById("chatModal").showModal();
  },[])
  return (
    <dialog onClick={(e) => {
        // !the dialog cover the full screen and only the modal box is displayed
        // if the user clicks directly on the dialog backdrop(background of the modal box)=outside the modal box → close
        if (e.target === document.getElementById("chatModal")) {
          document.getElementById("chatModal").close();
        }
      }} id="chatModal" className="modal modal-bottom sm:modal-middle  ">
  <div
  className="modal-box relative bg-white text-black w-full max-w-3xl rounded-xl shadow-xl flex flex-col p-4"
        style={{ maxHeight: "90vh" }}>

    {/* header */}
    <div>
      <h3 className="font-bold text-lg text-center text-secondary border-b-2 border-secondary">AI Shopping Assistent</h3>
      <button onClick={()=>{document.getElementById("chatModal").close();}} className="btn btn-sm size-8 btn-outline  btn-secondary absolute right-2 top-2 ">
            X
          </button>
    </div>




 {/* Chat Area */}
        <div
          id="chatMessages"
          className="flex-1 overflow-y-auto space-y-3 p-4 border-t border-b bg-gray-50
                 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        >
          {/* Initial greeting */}
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

          {/* Messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat ${msg.sender === "user" ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                  <img
                    src={
                      msg.sender === "user" ? user.profile.avatar : chataiAvatar
                    }
                    alt={msg.sender}
                  />
                </div>
              </div>
              <div
                className={`chat-bubble prose prose-md white-space-pre-wrap leading-9 text-md   break-words  ${
                  msg.sender === "user"
                    ? "bg-amber-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}

               {/*  <Markdown>{msg.text.replace(/\n{3,}/g, "\n\n")}</Markdown> */}
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


     <form
            className="flex items-center gap-2 w-full"
            onSubmit={handleMessageSubmission}
          >
            <input
              type="text"
              name="message"
              value={message}
              onChange={handleChange}
              placeholder="Type your message..."
              className="flex-1 w-full rounded-2xl input input-md input-secondary bg-white/95 text-base-content"
            />
            <button className="btn btn-secondary rounded-xl">Send</button>
          </form>
  </div>
</dialog>
  )
}

export default ChatDialog