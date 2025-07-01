"use client";

import { useCounterStore } from "@/Providers/Zustand";
import { motion } from "motion/react";
import { MdAddCircle } from "react-icons/md";

import clsx from "clsx";
import React from "react";
import { useStore } from "zustand";
import Link from "next/link";
import { useCards } from "@/Hooks/useCards";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {};

const Sidebar = (props: Props) => {
  const { sideBar } = useCounterStore((state) => state);
  const router = useRouter();
  const { data, isPending } = useCards();
   const params = useSearchParams();
  const id = params.get("course") || "";
  
 

  return (
    <motion.div
      className={clsx(
        " h-screen rounded-2xl px-2 sticky top-0 text-white",
        "w-3xs"
      )}
      animate={{ width: !sideBar ? "256px" : "100px" }}>
      <h1 className="text-center mt-3 py-4 text-3xl font-semibold">AIIRS</h1>
      <Link
        href={"/admin/create_course"}
        className=" mt-7 flex gap-1 w-full cursor-pointer justify-center border-white rounded-md bg-white  items-center  text-[#096731] transition-all font-medium px-4 py-2">
        Create Course <MdAddCircle className="mt-[0.220rem]" />
      </Link>
      <ul className=" flex gap-2 flex-col mt-7">
        {data &&
          data.map((val: any, index: number) => {
            return (
              <div
                onClick={() =>
                  router.push(`/admin/${val._id}/?course=${val._id}`)
                }
                key={index}
                className={clsx(
                  " cursor-pointer border-white rounded-md hover:bg-white hover:text-[#096731] transition-all font-medium px-4 py-2",
                  id === val._id && "bg-white text-[#096731]"
                )}>
                {/* <> */}
                {val.course_name.slice(0, 20)}
                {val.course_name.length >= 20 && "..."}
                {/* </> */}
              </div>
            );
          })}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
