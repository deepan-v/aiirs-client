"use client";

import React from "react";
import ReviewCard from "./ReviewCard";

const CardWrapper = ({ data }: { data: any }) => {

  return (
    <div className="mt-16">
      <h1 className="py-6 text-xl font-medium text-center">
        {" "}
       Review Cards
      </h1>
      <div className="grid grid-cols-3 gap-4 mt-6 ">
        {data.map((value: any, index: number) => {
          return <ReviewCard {...value} key={index} />;
        })}
      </div>
    </div>
  );
};

export default CardWrapper;
