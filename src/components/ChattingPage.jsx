import React, { useEffect, useRef } from "react";

function ChatMessage({ userName, message }) {
  return (
    <div className="flex flex-col">
      <div>{userName} </div>
      <div className=" bg-slate-300 rounded-lg py-2 px-4">{message}</div>
    </div>
  );
}

const ChattingPage = ({
  inputMessage,
  setInputMessages,
  sendMessage,
  allMessages,
  currUser,
}) => {
  // Ref for the chat messages container
  const messagesEndRef = useRef(null);

  // Function to scroll the messages container to the bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to bottom when new messages are added or component updates
  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  return (
    <div className="relative flex flex-col justify-between min-h-[100vh] bg-green-300 ">
      {/* Render all messages */}
      <div className="flex flex-col h-[92vh] overflow-y-auto">
        {allMessages.map((message, index) => (
          <div className="text-black" key={index}>
            {currUser === message.userName && (
              <div className="flex justify-end">
                <ChatMessage message={message.message} userName= {message.userName}></ChatMessage>
              </div>
            )}
            {currUser !== message.userName && (
              <div className="flex justify-start">
              <ChatMessage message={message.message} userName= {message.userName}></ChatMessage>
            </div>
            )}
          </div>
        ))}
        {/* Empty div to scroll to when new messages are added */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input field for sending new messages */}
      <form className="w-full flex ">
        <div className="flex w-full">
          <input
            type="text"
            className="text-black w-full py-2 px-4"
            value={inputMessage}
            onChange={(e) => setInputMessages(e.target.value)}
          />
          <button
            className="px-2 py-2 cursor-pointer bg-red-500"
            onClick={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChattingPage;
