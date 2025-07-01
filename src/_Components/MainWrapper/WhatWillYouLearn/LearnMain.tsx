"use client";

import React from "react";
import { useGetLearnCard } from "@/Hooks/useCards";
import { useSearchParams } from "next/navigation";
import FeatureCardForm from "./WhatWillYouLearn";
import CardWrapper from "./CardWrapper";

type Props = {};

const LearnCardMain = (props: Props) => {
  const params = useSearchParams();

  const id = params.get("course") || "";

  let { data, isPending } = useGetLearnCard(id);
  return (
    <div className="border-t-2">
      <FeatureCardForm />
      {isPending && <h1>Loading...</h1>}
      {!isPending && data.length !== 0 && <CardWrapper data={data} />}
      {!isPending && !data.length && (
        <h1 className="text-center my-7 text-3xl font-medium">
          No Cards Found
        </h1>
      )}
    </div>
  );
};

export default LearnCardMain;
