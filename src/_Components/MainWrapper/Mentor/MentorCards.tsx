'use client'

import React from "react";
import Image from "next/image";
import { PiSpinnerBold } from "react-icons/pi";
import { useMentorDelete } from "@/Hooks/useMentor";
import { useSearchParams } from "next/navigation";

type MentorProps = {
  name: string;
  profession: string;
  department: string;
  university: string;
  location: string;
  image: string;
};

const MentorCard = ({
  name,
  profession,
  department,
  university,
  location,
  image,
}: MentorProps) => {

  const params = useSearchParams();
  
    const id = params.get("course") || "";

  let { isPending ,mutateAsync } = useMentorDelete(id);

  let handleDeleteFunc = async () => {
    await mutateAsync();
  };
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 ">
      <div className="relative w-full h-56 rounded-xl overflow-hidden mb-4">
        <Image
          src={image}
          alt={"img"}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <h1>Name:</h1>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
      <h2 className="mb-1">Profession:</h2>
      <p className="text-sm text-gray-500  ">{profession}</p>
      <h2 className="mb-1">Department:</h2>

      <p className="text-sm text-gray-500">{department}</p>
      <h2 className="mb-1">University:</h2>
      <p className="text-sm text-gray-500 ">{university}</p>
      <h2 className="mb-1">Location:</h2>
      <p className="text-sm text-gray-500 ">{location}</p>
      <button
        disabled={isPending}
        onClick={handleDeleteFunc}
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

export default MentorCard;
