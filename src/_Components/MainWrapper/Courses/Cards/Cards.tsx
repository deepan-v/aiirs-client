"use client";

import Inputs from "@/libs/Inputs";
import { cardSchema, createCardSchema } from "@/Schema/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { FaRegTrashCan } from "react-icons/fa6";
import { RiImageEditLine } from "react-icons/ri";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PiSpinnerBold } from "react-icons/pi";
import { useCardDelete, useCardUpdate } from "@/Hooks/useBanner";

type value = {
  isPending: boolean;
  cardVal: {
    course_name: string;
    publicId: string;
    selectImage: any;
    _id: string;
    razorURL: string;
    color: string;
    student_enrolled: string;
    price: string;
    discount_price: string;
    rating: string;
    button_text: string;
  };
};

type someValue = {
  course_name: string;
  selectImage: any;
  rating: string;
  button_text: string;
  student_enrolled: string;
  price: string;
  razorURL: string;
  color: string;
  discount_price: string;
};

const Cards = ({ isPending, cardVal }: value) => {
  console.log(cardVal);
  const [imagePreview, setImagePreview] = useState<string | null>("");
  const [disabled, setDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cardSchema),
  });

  console.log(errors);

  let { mutateAsync, isPending: updatePending } = useCardUpdate(cardVal._id);
  let { mutateAsync: mutateAsyncDelete, isPending: deleteIsPending } =
    useCardDelete();

  let handleEditFunc = (value: string) => {
     console.log(value);
    if (value === "edit") {
      setDisabled(false);
    }

    if (value === "Cancel") {
      reset();
      setValue("course_name", cardVal.course_name);
      setValue("selectImage", cardVal.selectImage);
      setValue("rating", cardVal.rating);
      setValue("button_text", cardVal.button_text);
      setValue("student_enrolled", cardVal.student_enrolled);
      setValue("razorURL", cardVal.razorURL);
      setValue("color", cardVal.color);
      setValue("price", cardVal.price);
      setValue("discount_price", cardVal.discount_price);
      setImagePreview("");
      setDisabled(true);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  let handleDeleteFunc = async () => {
    await mutateAsyncDelete(cardVal._id);
  };

  useEffect(() => {
    if (cardVal) {
      setValue("course_name", cardVal.course_name);
      setValue("selectImage", cardVal.selectImage);
      setValue("rating", cardVal.rating);
      setValue("button_text", cardVal.button_text);
      setValue("student_enrolled", cardVal.student_enrolled);
      setValue("price", cardVal.price);
      setValue("razorURL", cardVal.razorURL);
      setValue("color", cardVal.color);
      setValue("discount_price", cardVal.discount_price);
    }
  }, []);

  let toValidate: (keyof someValue)[] = [
    "button_text",
    "course_name",
    "rating",
    "selectImage",
    "discount_price",
    "razorURL",
    "price",
    "student_enrolled",
    "color",
  ];

  let validatePreVal = (data: someValue) => {
    let value = 0;
    let formData = new FormData();
    for (let i = 0; i < toValidate.length; i++) {
      const key = toValidate[i];
      if (data[key] === cardVal[key]) {
        value++;
      } else {
        formData.append(key, data[key]);
      }
    }

    return value < 9 ? formData : "value has not changed";
  };

  return (
    <form
      onSubmit={handleSubmit(async (data: any) => {
        console.log(data);
        let prevVal = validatePreVal(data);
        if (prevVal === "value has not changed") {
          toast.success("there is not changes happen ");
        } else {
          let response = await mutateAsync({
            data: prevVal,
            publicId: cardVal.publicId,
          });
          if (response.status === 200) {
            setDisabled(true);
            setImagePreview("");
          }
        }
      })}
      className="max-w-[30rem] space-y-4">
      <h1 className="text-xl text-center text-slate-800 font-semibold mb-4">
        {cardVal.course_name}{" "}
      </h1>
      <Inputs
        label="Course Name"
        disabled={disabled}
        name="course_name"
        type="text"
        errors={errors}
        register={register}
      />
      <div className="grid grid-cols-2 gap-4">
        <Inputs
          label="discount_price"
          name="discount_price"
          type="text"
          disabled={disabled}
          errors={errors}
          register={register}
        />
        <Inputs
          label="price"
          name="price"
          type="text"
          disabled={disabled}
          errors={errors}
          register={register}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Inputs
          label="student_enrolled"
          name="student_enrolled"
          type="text"
          disabled={disabled}
          errors={errors}
          register={register}
        />
        <Inputs
          label="Button Text"
          name="button_text"
          disabled={disabled}
          type="text"
          errors={errors}
          register={register}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Inputs
          label="Razor URL"
          name="razorURL"
          type="text"
          disabled={disabled}
          errors={errors}
          register={register}
        />
        <Inputs
          label="Color"
          name="color"
          disabled={disabled}
          type="text"
          errors={errors}
          register={register}
        />
      </div>

      <div>
        {!imagePreview ? (
          <div className={clsx("relative", disabled && "cursor-not-allowed")}>
            <Image
              src={cardVal.selectImage}
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
            {!disabled && (
              <label
                htmlFor="cardImage"
                className="absolute top-0 left-0 w-full flex items-center justify-center h-full cursor-pointer hover:bg-[rgba(0,0,0,0.5)] rounded-[10px] transition-all">
                {" "}
                <RiImageEditLine className="text-white text-4xl" />
                <Controller
                  name="selectImage"
                  control={control}
                  render={({ field: { ref, name, onBlur, onChange } }) => (
                    <input
                      type="file"
                      id="cardImage"
                      className="hidden"
                      ref={ref}
                      placeholder=""
                      name={name}
                      onBlur={onBlur}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(e.target.files?.[0]);
                        setImagePreview(
                          file ? URL.createObjectURL(file) : null
                        );
                      }}
                    />
                  )}
                />
              </label>
            )}
          </div>
        ) : (
          <div className="relative">
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
            <div className="absolute top-0 group left-0 w-full flex items-center justify-center h-full  cursor-pointer hover:bg-[rgba(0,0,0,0.5)] rounded-[10px] transition-all">
              <FaRegTrashCan
                className=" text-4xl text-white opacity-0 group-hover:opacity-100"
                onClick={() => setImagePreview("")}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-6">
        {!disabled && (
          <>
            <button
              disabled={updatePending}
              onClick={() => handleEditFunc("Cancel")}
              className="cursor-pointer flex-1 border border-[#096731] text-[#096731] py-2  rounded">
              Cancel
            </button>
            <button
              disabled={updatePending}
              type="submit"
              onClick={() => handleEditFunc("edit")}
              className="cursor-pointer w-full flex-1 bg-[#096731] text-white py-2  rounded">
              {!updatePending ? (
                "Update"
              ) : (
                <PiSpinnerBold className="text-center text-lg m-auto animate-spin " />
              )}
            </button>
          </>
        )}
        {disabled && (
          <button
            type="button"
            onClick={() => setDisabled(false)}
            className="cursor-pointer w-full flex-1 bg-[#096731] text-white py-[9px]  rounded">
            Edit
          </button>
        )}
      </div>

      <button
        disabled={updatePending || deleteIsPending}
        onClick={handleDeleteFunc}
        type="button"
        className="cursor-pointer w-full  bg-[#096731] text-white py-2 mt-2 rounded">
        {!deleteIsPending ? (
          "Delete"
        ) : (
          <PiSpinnerBold className="text-center text-lg m-auto animate-spin " />
        )}
      </button>
    </form>
  );
};

export default Cards;
