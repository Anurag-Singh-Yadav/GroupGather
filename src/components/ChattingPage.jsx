import React, { useEffect, useRef } from "react";

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
                <div className="flex flex-col">
                  <div>{message.userName} </div>
                  <div className="bg-red-500">{message.message}</div>
                </div>
              </div>
            )}
            {currUser !== message.userName && (
              <div className="w-fit">
                <div>{message.userName} </div>
                <div className="bg-blue-500">{message.message}</div>
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
