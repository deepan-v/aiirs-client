"use client";

import React from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { useMultiCourseDelete } from "@/Hooks/useMultiCourse";
import { PiSpinnerBold } from "react-icons/pi";
import { useSearchParams } from "next/navigation";

type Props = {
  courseName1: string;
  courseImage1: string;
  courseName2: string;
  coursePrice1: string;
  coursePrice2: string;
  discountPrice: string;
  razorLink: string;
  publicId1: string;
  publicId2: string;
  courseImage2: string;
};

const CourseHighlightCard = ({
  courseName1,
  courseImage1,
  courseName2,
  coursePrice1,
  coursePrice2,
  discountPrice,
  razorLink,
  courseImage2,
}: Props) => {
  const params = useSearchParams();
  const id = params.get("course") || "";
  let { isPending, mutateAsync } = useMultiCourseDelete(id);

  let handleDeleteFunc = async () => {
    await mutateAsync();
  };
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-xl mx-auto border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Course Highlight
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <Image
            src={courseImage1}
            alt="Course 1"
            width={300}
            height={400}
            className="rounded-md object-cover shadow"
          />
          <div className="mt-2 flex w-full items-center justify-between">
            <p className="  font-medium text-gray-700">{courseName1}</p>
            <p className="  font-medium text-gray-700">{coursePrice1}</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src={courseImage2}
            alt="Course 2"
            width={200}
            height={300}
            className="rounded-md object-cover shadow"
          />
          <div className="mt-2 flex w-full items-center justify-between">
            <p className="font-medium text-gray-700">{courseName2}</p>
            <p className="font-medium text-gray-700">{coursePrice2}</p>
          </div>
        </div>
      </div>
      <div className="py-2">
        <p className="py-2 mt-2 ">
          <span className="font-medium mr-1">Discount Price {" : "}</span> 
          {discountPrice}
        </p>
        <p className="flex ">
          <span className="font-medium mr-3 text-nowrap ">Link {" : "} </span>{" "}
          {razorLink}
        </p>
      </div>
      <button
        disabled={isPending}
        onClick={handleDeleteFunc}
        type="button"
        className="cursor-pointer w-full mt-4 bg-[#096731] text-white py-2 rounded">
        {!isPending ? (
          "Delete"
        ) : (
          <PiSpinnerBold className="text-center text-lg m-auto animate-spin " />
        )}
      </button>
    </div>
  );
};

export default CourseHighlightCard;
