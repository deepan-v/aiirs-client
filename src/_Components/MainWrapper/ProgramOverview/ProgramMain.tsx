"use client";

import { useSearchParams } from "next/navigation";
import ProgramOverviewEdit from "./ProgramEdit";
import ProgramOverview from "./ProgramOverview";
import { useGetProgramOverview } from "@/Hooks/useCards";


type Props = {};

const ProgramMain = (props: Props) => {
  const params = useSearchParams();

  const id = params.get("course") || "";

 let { data  } = useGetProgramOverview(id);


  return (
    <div>
      <h1 className="my-8 font-medium text-center text-2xl">
        Program Overview Content Post
      </h1>
      {data !== "Program not found" ? (
        <ProgramOverviewEdit />
      ) : (
        <ProgramOverview />
      )}
      <div></div>
    </div>
  );
};

export default ProgramMain;
