"use client";

import React from "react";
import CourseCard from "./CourseCard";

const CardWrapper = ({ data }: { data: any }) => {
  console.log(data);
  return (
    <div className="grid grid-cols-2 gap-4 mt-16">
      {data.map((value: any, index: number) => {
        return <CourseCard {...value} key={index} />;
      })}
    </div>
  );
};

export default CardWrapper;
