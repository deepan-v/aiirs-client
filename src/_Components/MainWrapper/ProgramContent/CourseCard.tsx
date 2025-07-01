import { useProgramContentDelete } from "@/Hooks/useProgramContent";
import React from "react";
import { PiSpinnerBold } from "react-icons/pi";

type Props = {
  program_items: string[];
  title: string;
  _id: string;
};

const CourseCard = ({ program_items, title, _id }: Props) => {
  console.log(program_items, title, _id);
  let { isPending, mutateAsync } = useProgramContentDelete(_id);
  return (
    <div className=" mt-12 p-6 bg-white h-fit  grid grid-rows-[auto_1fr_auto] rounded-lg shadow-md border">
      <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>

      {program_items.map((value, index) => (
        <div key={index} className="mb-4">
          <p className="list-disc list-inside mt-2 space-y-1 text-gray-700">
            {" "}
            {value}{" "}
          </p>
        </div>
      ))}
      <button
        disabled={isPending}
        onClick={() => mutateAsync()}
        type="button"
        className="cursor-pointer w-full  bg-[#096731] text-white py-2 mt-2 rounded">
        {!isPending ? (
          "Delete"
        ) : (
          <PiSpinnerBold className="text-center text-lg m-auto animate-spin " />
        )}
      </button>
    </div>
  );
};

export default CourseCard;
