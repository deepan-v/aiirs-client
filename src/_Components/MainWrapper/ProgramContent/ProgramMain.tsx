"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import CardWrapper from "./ProgramWrapper";
import { useGetProgram } from "@/Hooks/useCards";
import ProgramCreate from "./ProgramCreate";

type Props = {};

const ProgramMainContent = (props: Props) => {
  const params = useSearchParams();

  const id = params.get("course") || "";

  let { data, isPending } = useGetProgram(id);
  console.log(data, 'sdfgjahsudbgfasdjvioagwepgjhiuwgdhioufi');
  return (
    <div>
      <div className="border-t-2 ">
        <ProgramCreate />
        {isPending && <h1>Loading...</h1>}
        {!isPending && data.length !== 0 && <CardWrapper data={data} />}
        {!isPending && !data.length && (
          <h1 className="text-center my-7 text-3xl font-medium">
            No Courses Found
          </h1>
        )}
      </div>
    </div>
  );
};

export default ProgramMainContent;
