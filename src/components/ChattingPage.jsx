// ChattingPage.jsx

import React from "react";

const ChattingPage = ({ inputMessage, setInputMessages, sendMessage, allMessages }) => {
  return (
    <div>
      {/* Render all messages */}
      {allMessages.map((message, index) => (
        <div key={index}>
          <span>{message.userName}: </span>
          <span>{message.message}</span>
        </div>
      ))}
      
      {/* Input field for sending new messages */}
      <input 
        type="text" 
        className="text-black"
        value={inputMessage} 
        onChange={(e) => setInputMessages(e.target.value)} 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChattingPage;
