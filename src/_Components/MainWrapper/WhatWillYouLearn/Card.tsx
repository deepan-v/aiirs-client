"use client";

import { useLearnDelete } from "@/Hooks/useLearn";
import { useSearchParams } from "next/navigation";
import React from "react";
import * as FaIcons from "react-icons/fa";
import { PiSpinnerBold } from "react-icons/pi";

// Define the props type
type FeatureCardProps = {
  icon: keyof typeof FaIcons;
  title: string;
  _id: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  _id,
  description,
}) => {
  console.log(_id);
  let { isPending, mutateAsync } = useLearnDelete(_id);
  const IconComponent = FaIcons[icon] || FaIcons.FaQuestion;

  let handleDeleteFunc = async () => {
    await mutateAsync();
  };

  return (
    <div className="p-6 rounded-lg shadow-md border bg-white hover:shadow-xl transition-all duration-300 w-full">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="text-4xl text-green-600">
          <IconComponent />
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <button
        disabled={isPending}
        onClick={handleDeleteFunc}
        type="button"
        className="cursor-pointer w-full  bg-[#096731] text-white py-2 mt-4 rounded">
        {!isPending ? (
          "Delete"
        ) : (
          <PiSpinnerBold className="text-center text-lg m-auto animate-spin " />
        )}
      </button>
    </div>
  );
};

export default FeatureCard;
