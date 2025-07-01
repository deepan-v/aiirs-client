import MainContainer from "@/_Components/MainContainer/MainContainer";
import Sidebar from "@/_Components/Sidebar/Sidebar";
import React, { Suspense } from "react";

export interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <div className="grid grid-cols-[auto_1fr] m-2 rounded-3xl">
      <Suspense fallback={null}>
        <Sidebar />
        <MainContainer>{children}</MainContainer>
      </Suspense>
    </div>
  );
};

export default layout;
