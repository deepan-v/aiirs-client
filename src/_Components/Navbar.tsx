"use client";

import React from "react";
import { RiMenu3Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { useCounterStore } from "@/Providers/Zustand";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  const { toggleState, sideBar } = useCounterStore((state) => state);

  return (
    <div className="bg-[#096731] w-full px-4 py-3 text-white flex items-center justify-between ">
      <div onClick={() => toggleState(sideBar)}>
        {!sideBar ? (
          <RiMenu3Line className="text-2xl cursor-pointer" />
        ) : (
          <IoClose className="text-2xl cursor-pointer" />
        )}
      </div>
      <div className="flex items-center gap-3"> 
        <Link href={"/admin/Notification"}> Notification </Link>
        <CgProfile className="text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
