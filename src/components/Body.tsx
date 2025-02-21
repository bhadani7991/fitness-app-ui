import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

interface BodyProps {}
const Body: React.FC<BodyProps> = (props) => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
