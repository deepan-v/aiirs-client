'use client'

import { useReviewDelete } from "@/Hooks/useReview";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { PiSpinnerBold } from "react-icons/pi";

type Props = {
  image: string;
   _id:string // Array of image URLs
  // You can pass publicId if you're using Cloudinary
};

const ReviewCard = ({ image, _id }: Props) => {
  const params = useSearchParams();
  const id = params.get("course") || "";
  let { isPending, mutateAsync } = useReviewDelete(_id);

  let handleDeleteFunc = async () => {
    await mutateAsync();
  };
  return (
    <div>
      <img
        src={image}
        alt={"images"}
        className="w-full h-52 object-cover rounded"
      />
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

export default ReviewCard;
