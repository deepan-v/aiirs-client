"use client";

import React from "react";
import {  useGetReviews } from "@/Hooks/useCards";
import { useSearchParams } from "next/navigation";

import CardWrapper from "./CardWrapper";
import MultipleImageForm from "./ReviewPost";


type Props = {};

const ReviewMain = (props: Props) => {
  const params = useSearchParams();

  const id = params.get("course") || "";

  let { data, isPending } = useGetReviews(id);


  return (
    <div className="border-t-2 ">
      <MultipleImageForm />
      {isPending && <h1>Loading...</h1>}
      {!isPending && data.length !== 0 && <CardWrapper data={data} />}
      {!isPending && !data.length && (
        <h1 className="text-center my-7 text-3xl font-medium">
          No Reviews Found
        </h1>
      )}
    </div>
  );
};

export default ReviewMain;
