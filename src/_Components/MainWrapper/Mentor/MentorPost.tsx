"use client";

import Inputs from "@/libs/Inputs";
import TextArea from "@/libs/TextArea";
import { MentorSchema } from "@/Schema/Form"; // You’ll need to define this
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { IoCloudUpload } from "react-icons/io5";
import { PiSpinnerBold } from "react-icons/pi";
import { useMentor } from "@/Hooks/useMentor";
import { useSearchParams } from "next/navigation";
// Custom hook for API call

type MentorFormType = {
  name: string;
  profession: string;
  department: string;
  university: string;
  location: string;
  selectImage: File | string;
};

const Mentor = () => {
  const params = useSearchParams();

  const id = params.get("course") || "";
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(MentorSchema),
  });


   useEffect(() => {
      return () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
      };
    }, [imagePreview]);

  const { mutateAsync, isPending } = useMentor(); // custom mutation hook


  const onSubmit = async (data: MentorFormType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("profession", data.profession);
    formData.append("department", data.department);
    formData.append("id", id);
    formData.append("university", data.university);
    formData.append("location", data.location);
    formData.append("selectImage", data.selectImage);

    const res = await mutateAsync(formData);
    if (res.status === 200) {
      reset();
      setImagePreview(null);
    }
  };

  return (
    <form
      className="space-y-4 max-w-[35rem] m-auto mt-16"
      onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center font-medium text-2xl">Mentor Content Post</h1>
      <div className="grid grid-cols-2 gap-3">
        <Inputs
          label="Name"
          name="name"
          type="text"
          register={register}
          errors={errors}
        />

        <Inputs
          label="Profession"
          name="profession"
          type="text"
          register={register}
          errors={errors}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Inputs
          label="Department"
          name="department"
          type="text"
          register={register}
          errors={errors}
        />
        <Inputs
          label="University"
          name="university"
          type="text"
          register={register}
          errors={errors}
        />
      </div>

      <Inputs
        label="Location"
        name="location"
        type="text"
        register={register}
        errors={errors}
      />

      {!imagePreview ? (
        <div>
          <label
            htmlFor="mentorImage"
            className="border-dashed border-2 w-3xs  py-6 flex justify-center flex-col cursor-pointer rounded-md m-auto items-center">
            <IoCloudUpload className="text-5xl text-slate-600 " />
            <p className="text-slate-400">Upload Image</p>
            <Controller
              name="selectImage"
              control={control}
              render={({ field: { ref, name, onBlur, onChange } }) => (
                <input
                  type="file"
                  id="mentorImage"
                  className="hidden"
                  ref={ref}
                  placeholder=""
                  name={name}
                  onBlur={onBlur}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(e.target.files?.[0]);
                    setImagePreview(file ? URL.createObjectURL(file) : null);
                  }}
                />
              )}
            />
          </label>
          <p className="text-red-500 text-xs mt-1 ml-1 font-normal">
            {errors.selectImage && (errors.selectImage?.message as any)}
          </p>
        </div>
      ) : (
        <div>
          <Image
            src={imagePreview}
            width={250}
            height={100 * 250}
            className="m-auto"
            loading="lazy"
            alt="img"
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

export default Mentor;
