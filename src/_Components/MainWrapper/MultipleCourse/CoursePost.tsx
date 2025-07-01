"use client";

import Inputs from "@/libs/Inputs";
import { CourseSchema } from "@/Schema/Form"; // define this in zod
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { IoCloudUpload } from "react-icons/io5";
import { PiSpinnerBold } from "react-icons/pi";
import { useMultiCourse } from "@/Hooks/useMultiCourse";
import { useSearchParams } from "next/navigation";
// your custom API hook

type CourseFormType = {
  courseName1: string;
  courseImage1: File | string;
  coursePrice1:string
  coursePrice2:string
  discountPrice:string
  razorLink:string
  courseName2: string;
  courseImage2: File | string;
};

const CourseHighlight = () => {
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const params = useSearchParams();

  const id = params.get("course") || "";

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CourseSchema),
  });

  const { mutateAsync, isPending } = useMultiCourse();

  useEffect(() => {
    return () => {
      if (preview1) URL.revokeObjectURL(preview1);
      if (preview2) URL.revokeObjectURL(preview2);
    };
  }, [preview1, preview2]);

  const onSubmit = async (data: CourseFormType) => {
    const formData = new FormData();
    formData.append("courseName1", data.courseName1);
    formData.append("courseImage1", data.courseImage1);
    formData.append("coursePrice1", data.coursePrice1);
    formData.append("coursePrice2", data.coursePrice2);
    formData.append("discountPrice", data.discountPrice);
    formData.append("razorLink", data.razorLink);
    formData.append("id", id);
    formData.append("courseName2", data.courseName2);
    formData.append("courseImage2", data.courseImage2);

    const res = await mutateAsync(formData);
    if (res.status === 200) {
      reset();
      setPreview1(null);
      setPreview2(null);
    }
  };

  return (
    <form
      className="space-y-4  max-w-[35rem] m-auto mt-16"
      onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center font-medium text-2xl mb-5">
        Create Multiple Course
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <Inputs
          label="Course Name 1"
          name="courseName1"
          type="text"
          register={register}
          errors={errors}
        />

        {/* Second Course */}
        <Inputs
          label="Course Name 2"
          name="courseName2"
          type="text"
          register={register}
          errors={errors}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Inputs
          label="Price for Above Course "
          name="coursePrice1"
          type="text"
          register={register}
          errors={errors}
        />

        {/* Second Course */}
        <Inputs
          label="Price for Above Course "
          name="coursePrice2"
          type="text"
          register={register}
          errors={errors}
        />
      </div>
      <Inputs
        label="Discount Price "
        name="discountPrice"
        type="text"
        register={register}
        errors={errors}
      />
      <Inputs
        label="Razor Pay Link"
        name="razorLink"
        type="text"
        register={register}
        errors={errors}
      />

      <div className="grid grid-cols-2">
        {!preview1 ? (
          <div className="rounded-md">
            <label
              htmlFor="courseImage1"
              className="border-dashed border-2 w-3xs py-6 flex justify-center flex-col cursor-pointer rounded-md m-auto items-center">
              <IoCloudUpload className="text-5xl text-slate-600" />
              <p className="text-slate-400">Upload Course Image 1</p>
              <Controller
                name="courseImage1"
                control={control}
                render={({ field: { onChange, onBlur, ref, name } }) => (
                  <input
                    type="file"
                    id="courseImage1"
                    className="hidden"
                    ref={ref}
                    name={name}
                    onBlur={onBlur}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                      setPreview1(file ? URL.createObjectURL(file) : null);
                    }}
                  />
                )}
              />
            </label>
            <p className="text-red-500 text-xs mt-1 ml-1 font-normal">
              {errors.courseImage1 && (errors.courseImage1.message as any)}
            </p>
          </div>
        ) : (
          <div className="rounded-md ">
            <Image
              src={preview1}
              width={250}
              height={300}
              className="m-auto rounded-md "
              alt="course-img-1"
            />
          </div>
        )}

        {!preview2 ? (
          <div className="rounded-md ">
            <label
              htmlFor="courseImage2"
              className="border-dashed border-2 w-3xs py-6 flex justify-center flex-col cursor-pointer rounded-md m-auto items-center">
              <IoCloudUpload className="text-5xl text-slate-600" />
              <p className="text-slate-400">Upload Course Image 2</p>
              <Controller
                name="courseImage2"
                control={control}
                render={({ field: { onChange, onBlur, ref, name } }) => (
                  <input
                    type="file"
                    id="courseImage2"
                    className="hidden"
                    ref={ref}
                    name={name}
                    onBlur={onBlur}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                      setPreview2(file ? URL.createObjectURL(file) : null);
                    }}
                  />
                )}
              />
            </label>
            <p className="text-red-500 text-xs mt-1 ml-1 font-normal">
              {errors.courseImage2 && (errors.courseImage2.message as any)}
            </p>
          </div>
        ) : (
          <div>
            <Image
              src={preview2}
              width={250}
              height={300}
              className="m-auto rounded-md "
              alt="course-img-2"
            />
          </div>
        )}
      </div>

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

export default CourseHighlight;
