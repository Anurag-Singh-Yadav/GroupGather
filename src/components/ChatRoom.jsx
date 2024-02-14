import React, { useEffect, useRef, useState } from "react";
import Client from "./Client";
import { initSocket } from "../socket";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import ACTIONS from "../action";
import { toast } from "react-toastify";
import ChattingPage from "./ChattingPage";

export default function ChatRoom() {
  const [clients, setClients] = useState([]);
  const [inputMessage, setInputMessages] = useState("");
  const [allMessages, setAllMessages] = useState([]); 
  const location = useLocation();
  const socketRef = useRef(null);
  const reactNavigate = useNavigate();
  const { roomId } = useParams();
  const [currUser ,setCurrUser] = useState(null);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on("connection_error", (err) => handleError(err));
      socketRef.current.on("connection_failed", (err) => handleError(err));

      function handleError(err) {
        console.log(err);
        reactNavigate("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName,
      });
  setCurrUser(location.state?.userName);
      socketRef.current.on(ACTIONS.JOINED, ({ allClients, userName, socketId }) => {
        if (userName !== location.state?.userName) {
          toast.info(`${userName} joined`);
        }
        setClients(allClients);
      });

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, userName }) => {
        toast.info(`${userName} left`);
        setClients((prev) => prev.filter((client) => client.socketId !== socketId));
      });

      // Listen for incoming messages and update allMessages state
      socketRef.current.on(ACTIONS.MESSAGE_RECEIVED, ({ userName, message }) => {
        setAllMessages((prevMessages) => [...prevMessages, { userName, message }]);
      });
    };

    init();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off(ACTIONS.JOINED);
      socketRef.current?.off(ACTIONS.DISCONNECTED);
      socketRef.current?.off(ACTIONS.MESSAGE_RECEIVED);
    };
  }, [roomId, location.state?.userName]);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    socketRef.current.emit(ACTIONS.MESSAGE_RECEIVED, {
      roomId,
      message: inputMessage,
    });
    setInputMessages("");
  };

  function leaveRoom() {
    reactNavigate("/");
  }

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room copied successfully");
    } catch (e) {
      console.log("Error", e);
    }
  }

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col sm:flex-row h-[100vh]">
      <div className="flex sm:fixed z-10 bg-[#252B48] left-0 top-0 h-[100vh] flex-col text-white justify-between min-w-[230px] px-3 pt-2">
        <div className="flex flex-col gap-2">
          <h1>Connected</h1>
          <div className="flex gap-3 flex-wrap">
            {clients.map((client) => (
              <Client key={client.socketId} userName={client.userName} />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-start mb-3 gap-3">
          <button className="bg-green-500 text-lg rounded-md px-3 py-2" onClick={copyRoomId}>
            Copy Room Id
          </button>
          <button className="bg-white text-black text-lg rounded-md px-3 py-2" onClick={leaveRoom}>
            Leave Room
          </button>
        </div>
      </div>

      <div className="sm:pl-[230px] w-full min-h-[100vh]">
        <ChattingPage
          inputMessage={inputMessage}
          setInputMessages={setInputMessages}
          sendMessage={sendMessage}
          currUser={currUser}
          allMessages={allMessages} 
        />
      </div>
    </div>
  );
}
