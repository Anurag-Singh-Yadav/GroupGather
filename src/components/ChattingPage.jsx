import React, { useEffect, useRef } from "react";
import Avatar from "react-avatar";

function ChatMessage({ userName, message }) {
  return (
    <div className="flex justify-between gap-2">
      <div>
        <Avatar name={userName} size="30" round="10px"></Avatar>
      </div>
      <div className="bg-white rounded-md">
        <div className="text-blue-500 text-xs text-start px-1 italic">{userName}</div>
        <div className="rounded-lg text-start py-2 px-4">{message}</div>
      </div>
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
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  return (
    <div className="relative flex flex-col justify-between min-h-[100vh] bg-[#f5f6f7] text-black">
      <div>
        <div className="py-3 font-bold text-xl bg-green-500 text-black">
          Welcome to Chat Room
        </div>
        {/* Render all messages */}
        <div className="flex flex-col py-2 gap-3 h-[80vh] overflow-y-auto">
          {allMessages.map((message, index) => (
            <div className="" key={index}>
              {currUser === message.userName && (
                <div className="flex justify-end mx-4">
                  <div className="bg-white px-4 py-1 rounded-sm ">{message.message}</div>
                </div>
              )}
              {currUser !== message.userName && (
                <div className="flex justify-start mx-4">
                  <ChatMessage
                    message={message.message}
                    userName={message.userName}
                  ></ChatMessage>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input field for sending new messages */}
      <form className="w-full rounded-md mb-1 pr-2 flex ">
        <div className="flex w-full">
          <input
            type="text"
            className="text-black w-full border-2 border-black py-2 px-4"
            value={inputMessage}
            onChange={(e) => setInputMessages(e.target.value)}
          />
          <button
            className="px-4 py-2 cursor-pointer font-medium rounded-r-md bg-green-500"
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
