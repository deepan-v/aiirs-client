"use client";

import React from "react";
import SelectCard from "./SelectCard";
import FeatureCard from "./Card";

const CardWrapper = ({ data }: { data: any }) => {
  return (
    <div className="mt-16">
      <h1 className="py-6 text-xl font-medium text-center">
        {" "}
        What Will You Learn Card
      </h1>
      <div className="grid grid-cols-4 gap-4 mt-6">
        {data.map((value: any, index: number) => {
          return <FeatureCard {...value} key={index} />;
        })}
      </div>
    </div>
  );
};

export default CardWrapper;
