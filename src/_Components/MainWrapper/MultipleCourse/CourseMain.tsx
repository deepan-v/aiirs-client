"use client";

import React from "react";
import { useGetMentor, useGetMultiple } from "@/Hooks/useCards";
import { useSearchParams } from "next/navigation";
import CourseHighlight from "./CoursePost";
import CourseHighlightCard from "./CourseCard";
import CardWrapper from "./CardWrapper";


type Props = {};

const MultipleMain = (props: Props) => {
  const params = useSearchParams();

  const id = params.get("course") || "";

  let { data, isPending } = useGetMultiple(id);

  return (
    <div className="border-t-2 ">
      <CourseHighlight />
      {isPending && <h1>Loading...</h1>}
      {!isPending && data.length !== 0 && <CardWrapper data={data} />}
      {!isPending && !data.length && (
        <h1 className="text-center my-7 text-3xl font-medium">
          No Courses Found
        </h1>
      )}
    </div>
  );
};

export default MultipleMain;
