import React, { useEffect } from "react";
import "./App.css";
import Body from "./components/Body";
import { Route, Routes, useNavigate } from "react-router-dom";
import Workout from "./pages/workout/Workout";
import Login from "./pages/auth/Login";
import Goal from "./pages/goal/Goal";
import Profile from "./pages/profile/Profile";

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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
