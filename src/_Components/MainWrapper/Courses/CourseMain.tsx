"use client";

import React from "react";
import CreateCourses from "./CourseCreateForm/Courses";
import Cards from "./Cards/Cards";
import { useCards } from "@/Hooks/useCards";

const CourseMain = () => {
  let { data, isPending } = useCards();
  console.log(data.length);
  return (
    <div>
      <h1 className="my-10 font-medium text-3xl text-center ">Form for Create Course </h1>
      <div className="m-auto ">
        <CreateCourses />
      </div>
      <div className="grid grid-cols-3 gap-6 mt-24 ">
        {data &&
          data.map((value: any, index: number) => {
            return <Cards key={index} isPending={isPending} cardVal={value} />;
          })}
      </div>
      {/* <div>{data?.length ===0 && <h1 className="text-center font-semibold text-4xl mb-8 text-slate-500">No Cards Found </h1>}</div> */}
    </div>
  );
};

export default CourseMain;
