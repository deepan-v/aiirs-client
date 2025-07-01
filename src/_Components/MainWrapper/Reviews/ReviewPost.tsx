"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoCloudUpload } from "react-icons/io5";
import { PiSpinnerBold } from "react-icons/pi";
import Inputs from "@/libs/Inputs";
import Image from "next/image";
import { useReview } from "@/Hooks/useReview";
import { useSearchParams } from "next/navigation";

const schema = z.object({
  images: z
    .any()
    .refine((file) => file instanceof File || typeof file === "string", {
      message: "Course image is required",
    }),
});

type FormDataType = z.infer<typeof schema>;

const MultipleImageForm = () => {
  const [previews, setPreviews] = useState<string | null>("");
  const params = useSearchParams();

  const id = params.get("course") || "";

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  let { mutateAsync, isPending } = useReview();

  const onSubmit = async (data: FormDataType) => {
    const formData = new FormData();
    formData.append("images", data.images);
    formData.append("id", id);

    const res = await mutateAsync(formData);
    if (res?.status === 200) {
      reset();
      setPreviews("");
    }
  };

  useEffect(() => {
    return () => {
      if (previews) URL.revokeObjectURL(previews);
    };
  }, [previews]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-[35rem] m-auto mt-16">
      <h1 className="text-center font-medium text-2xl">Upload Review Image</h1>

      {!previews ? (
        <div>
          <label
            htmlFor="multiUpload"
            className="border-dashed h-60 border-2 w-full py-6 flex justify-center flex-col cursor-pointer rounded-md items-center">
            <IoCloudUpload className="text-5xl text-slate-600" />
            <p className="text-slate-400">Upload Images</p>
            <Controller
              name="images"
              control={control}
              render={({ field: { onChange, ref } }) => (
                <input
                  type="file"
                  id="multiUpload"
                  className="hidden"
                  multiple
                  accept="image/*"
                  ref={ref}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(e.target.files?.[0]);
                    setPreviews(file ? URL.createObjectURL(file) : null);
                  }}
                />
              )}
            />
          </label>
          {errors.images && (
            <p className="text-red-500 text-xs mt-1">
              {errors.images.message as any}
            </p>
          )}
        </div>
      ) : (
        <div className="w-full h-60 relative gap-3 mt-4">
          <Image
            src={previews}
            fill
            alt="preview"
            className="w-full h-32 object-cover rounded shadow"
          />
        </div>
      )}

      <button
        disabled={isPending}
        className="cursor-pointer w-full bg-[#096731] text-white py-2 mt-6 rounded">
        {!isPending ? (
          "Submit"
        ) : (
          <PiSpinnerBold className="text-center text-xl m-auto animate-spin" />
        )}
      </button>
    </form>
  );
};

export default MultipleImageForm;
