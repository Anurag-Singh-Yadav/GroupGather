import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
function Home() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  function createRoomId() {
    const uniqueId = uuidv4();
    setRoomId(uniqueId);
    toast.success("🦄 RoomId Created Enjoy! 🔯", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      color: "black",
      theme: "light",
    });
  }

  const checkUserName = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user`,
        {
          roomId,
          userName,
        }
      );
        console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  const adduser = async()=>{
    try{
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/addUser`,
      {
        roomId,
        userName,
      })
      console.log(response);
    }catch(e){

    }
  }

  function joinRoom() {
    if (!roomId || !userName) {
      toast.warn("🦄 RoomId or Username is empty", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    checkUserName();
    adduser();
    navigate(`/editor/${roomId}`, {
      state: {
        userName,
      },
    });
  }

  function enterToGo(e) {
    if (e.code === "Enter") joinRoom();
  }
  return (
    <div className="min-h-[100vh] h-fit flex justify-center items-center">
      <div
        className="text-white flex flex-col gap-5
       bg-[#263159] px-4 py-3 min-w-[25rem] rounded-md"
      >
        <div className="w-full">
          <img src="./Code Merge.png" alt="" width="70"></img>
        </div>
        <div className="w-full">Paste Invitation ROOM ID</div>
        <input
          type="text"
          placeholder="ROOM ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="text-center text-black outline-none h-9"
          onKeyUp={enterToGo}
        ></input>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="text-center text-black outline-none h-9"
          onKeyUp={enterToGo}
        ></input>

        <button
          className="w-full bg-green-500 px-4 py-2 rounded-sm"
          onClick={joinRoom}
        >
          Join Room
        </button>
        <div className="t text-center flex justify-center gap-3">
          If don't have
          <span
            className="cursor-pointer text-green-500"
            onClick={createRoomId}
          >
            Create
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
