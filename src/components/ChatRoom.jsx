import React, { useEffect, useRef, useState } from "react";
import Client from "./Client";
import { initSocket } from "../socket";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import ACTIONS from "../action";
import { toast } from "react-toastify";
import ChattingPage from "./ChattingPage";
export default function ChatRoom() {

  const [clients, setCLients] = useState([]);

  const [messages, setMessages] = useState("");

  const codeRef = useRef(null);

  const location = useLocation();

  const socketRef = useRef(null);

  const reactNavigate = useNavigate();

  const { roomId } = useParams();

  useEffect(() => {
    
    const init = async () => {

      // this line is use for the connection of frontend to backend server
      socketRef.current = await initSocket();

      
      socketRef.current.on("connection_error", (err) => handleError(err));

      socketRef.current.on("connection_failed", (err) => handleError(err));


      function handleError(err) {
        console.log(err);
        reactNavigate("/");
      }

      // sending message to the server with username and roomid
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName,
      });


      // listing events

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ allClients, userName, socketId }) => {
          if (userName !== location.state?.userName) {
            toast.info(`${userName} joined`)
            // console.log(`${userName} joined`);
          }
          setCLients(allClients);
          socketRef.current.emit(ACTIONS.SYNC_CODE,{
            code: codeRef.current,
            socketId,
          })
        }
      );

      // listing for disconnections

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, userName }) => {
        toast.info(`${userName} left`);
        setCLients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };

    init();
    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off(ACTIONS.JOINED);
      socketRef.current?.off(ACTIONS.DISCONNECTED);
    };

  },[]);

  function leaveRoom(){
    reactNavigate("/");
  }

    async function copyRoomId(){
      try{

        await navigator.clipboard.writeText(roomId);
        toast.success('Room copied successfully');

      }catch(e){
        console.log("Error", e);
      }
    }

  if (!location.state) {
    <Navigate to="/"></Navigate>;
  }

  // components


  return (
    <div className="text-white flex min-h-[100vh] gap-5">
    <div className="flex flex-col justify-between min-w-[220px] pl-3 pt-2">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <img src="/Code Merge.png" alt="" width="50"></img>
          <div className="h-[0.1rem] bg-white"></div>
        </div>
        <h1>Connected</h1>
        <div className="flex gap-3 flex-wrap">
          {clients.map((clients, i) => (
            <Client key={clients.userNo} userName={clients.userName}></Client>
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

    <div className="w-full min-h-[100vh] bg-red-300">
      <ChattingPage messages={messages} setMessages={setMessages}></ChattingPage>
    </div>

  </div>
  );
}
