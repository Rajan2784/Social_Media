import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/authentication/Authentication";
import HomePage from "./pages/home/HomePage";
import Message from "./components/message/Message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileAction } from "./redux/auth/auth.action";

function App() {
  const { user } = useSelector((store) => store.auth);
  const jwt = localStorage.getItem("jwt")
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getProfileAction(jwt))
  },[jwt])

  return (
    
    <div>
      <Routes>
        <Route
          path="/*"
          element={user ? <HomePage /> : <Authentication />}
        />
        <Route path="/message" element={<Message />} />
        <Route path="/*" element={<Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
