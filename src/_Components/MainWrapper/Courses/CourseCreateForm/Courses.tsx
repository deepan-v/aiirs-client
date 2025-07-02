"use client";

import { useCard } from "@/Hooks/useAuth";
import Inputs from "@/libs/Inputs";
import { cardSchema, createCardSchema } from "@/Schema/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoCloudUpload } from "react-icons/io5";
import { PiSpinnerBold } from "react-icons/pi";

const CreateCourses = () => {
  const [imagePreview, setImagePreview] = useState<string | null>("");
  const {
    register,
    handleSubmit,
    reset,
    control,
   getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCardSchema),
  });

  const firstName = watch("color");
  console.log(firstName);

  let { mutateAsync, isPending } = useCard();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        let formData = new FormData();
        formData.append("selectImage", data.selectImage);
        formData.append("course_name", data.course_name);
        formData.append("student_enrolled", data.student_enrolled);
        formData.append("price", data.price);
        formData.append("discount_price", data.discount_price);
        formData.append("rating", data.rating);
        formData.append("button_text", data.button_text);
        formData.append("color", data.color);
        formData.append("razorURL", data.razorURL);
        let res = await mutateAsync(formData);
        if (res.status === 200) {
          reset();
          setImagePreview("");
        }
      })}
      className="max-w-[30rem] m-auto space-y-4">
      <Inputs
        label="Course Name"
        name="course_name"
        type="text"
        errors={errors}
        register={register}
      />
      <Inputs
        label="Student Enrolled"
        name="student_enrolled"
        type="text"
        errors={errors}
        register={register}
      />
      <Inputs
        label="Razor pay link"
        name="razorURL"
        type="text"
        errors={errors}
        register={register}
      />
      <div className="grid grid-cols-2 gap-3">
        <Inputs
          label="Previous Price"
          name="discount_price"
          type="text"
          errors={errors}
          register={register}
        />
        <Inputs
          label="Price"
          name="price"
          type="text"
          errors={errors}
          register={register}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Inputs
          label="Rating"
          name="rating"
          type="text"
          errors={errors}
          register={register}
        />
        <Inputs
          label="Button Text"
          name="button_text"
          type="text"
          errors={errors}
          register={register}
        />
      </div>

      <div>
        <div>
          <input {...register("color")} className="h-15 w-15 " type="color" />
          <p className="text-red-500 text-xs mt-1 ml-1 font-normal">
            {errors["color"] && errors["color"]?.message}
          </p>
        </div>
        <p className="text-sm w-96 font-medium">Note: Please select the color that you want, otherwise it would be in random color ! </p>
      </div>

      {!imagePreview ? (
        <div>
          <label
            htmlFor="image"
            className="border-dashed border-2 w-full  py-6 flex justify-center flex-col cursor-pointer rounded-md m-auto items-center">
            <IoCloudUpload className="text-5xl text-slate-600 " />
            <p className="text-slate-400">Upload Image</p>
            <Controller
              name="selectImage"
              control={control}
              render={({ field: { ref, name, onBlur, onChange } }) => (
                <input
                  type="file"
                  id="image"
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
            alt="img"
            height={0}
            width={1000}
            style={{
              height: "200px",
              width: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
      )}
      <button
        disabled={isPending}
        className="cursor-pointer w-full bg-[#096731] text-white py-2 mt-6 rounded">
        {!isPending ? (
          "Submit"
        ) : (
          <PiSpinnerBold className="text-center text-xl m-auto animate-spin " />
        )}
      </button>
    </form>
  );
};

export default CreateCourses;
