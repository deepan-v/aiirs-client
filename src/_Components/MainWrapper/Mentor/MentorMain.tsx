"use client";

import React from "react";
import Mentor from "./MentorPost";
import { useGetMentor } from "@/Hooks/useCards";
import { useSearchParams } from "next/navigation";
import CardWrapper from "./CardWrapper";

type Props = {};

const MentorMain = (props: Props) => {
  const params = useSearchParams();

  const id = params.get("course") || "";

  let { data, isPending } = useGetMentor(id);



  return (
    <div className="border-t-2">
      <Mentor />
      {isPending && <h1>Loading...</h1>}
      {!isPending && data.length !== 0 && <CardWrapper data={data} />}
      {!isPending && !data.length && (
        <h1 className="text-center my-7 text-3xl font-medium">No Mentors Found</h1>
      )}
    </div>
  );
};

export default MentorMain;
