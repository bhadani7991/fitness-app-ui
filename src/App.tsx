import React, { useEffect } from "react";
import "./App.css";
import Body from "./components/Body";
import { Provider, useDispatch, useSelector } from "react-redux";
import appStore, { RootState } from "./utils/appStore";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Workout from "./pages/workout/Workout";
import Login from "./pages/auth/Login";
import axios from "axios";
import { BASE_URL } from "./appConstant";
import { addUser } from "./utils/userSlice";
import Goal from "./pages/goal/Goal";
import Profile from "./pages/profile/Profile";
import Logout from "./pages/logout/Logout";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Workout />}></Route>
          <Route path="/workout" element={<Workout />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/goals" element={<Goal />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
