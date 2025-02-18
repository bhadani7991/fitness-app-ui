import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

interface BodyProps {}
const Body: React.FC<BodyProps> = (props) => {
  return (
    <div className="p-2">
      <div>
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
