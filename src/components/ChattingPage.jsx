// ChattingPage.jsx

import React from "react";

const ChattingPage = ({
  inputMessage,
  setInputMessages,
  sendMessage,
  allMessages,
}) => {
  console.log("ChattingPage",allMessages);
  return (
    <div className="relative h-[100vh] bg-green-300">
      {/* Render all messages */}
      <div>
        {allMessages.map((message, index) => (
          <div className="text-black" key={index}>
            <span>{message.userName}: </span>
            <span>{message.message}</span>
          </div>
        ))}
      </div>

      {/* Input field for sending new messages */}
      <div className="absolute bottom-1 flex w-full">
        <input
          type="text"
          className="text-black w-full py-2 px-4"
          value={inputMessage}
          onChange={(e) => setInputMessages(e.target.value)}
        />
        <div className="px-2 py-2 cursor-pointer bg-red-500" onClick={()=>{sendMessage()}}>Send</div>
      </div>
    </div>
  );
};

export default ChattingPage;
