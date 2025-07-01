import React from "react";
import Navbar from "../Navbar";

type props = {
  children: React.ReactNode;
};

const MainContainer = ({ children }: props) => {
  return (
    <div className="rounded-2xl overflow-hidden">
      <Navbar/>
      <div>{children}</div>
    </div>
  );
};

export default MainContainer;
