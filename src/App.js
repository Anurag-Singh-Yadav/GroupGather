import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import ChatRoom from "./components/ChatRoom";
function App() {
  return (
    <div className="App bg-[#252B48] min-h-[100vh] sm:overflow-hidden">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/editor/:roomId"
          element={<ChatRoom></ChatRoom>}
        ></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
    </div>
  );
}

export default App;
