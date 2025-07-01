"use client";

import Inputs from "@/libs/Inputs";
import TextArea from "@/libs/TextArea";
import { BannerSchema } from "@/Schema/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import Calender from "@/libs/Calender";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useBannerDelete, useBannerUpdate } from "@/Hooks/useBanner";
import { PiSpinnerBold } from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import { RiImageEditLine } from "react-icons/ri";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useGetBanner } from "@/Hooks/useCards";

type formType = {
  price: string;
  banner_title: string;
  from_date: Date | any;
  to_date: Date | any;
  venue: string;
  program_timing: string;
  selectImage: string;
};

type updateBannerType = {
  _id: string;
  banner_title: string;
  price: string;
  image: string;
  venue: string;
  course_name: string;
  student_enrolled: string;
  program_timing: string;
  to_date: string;
  from_date: string;
};

const EditBanner = () => {
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [disabled, setDisabled] = useState(true);
  const params = useSearchParams();

  const id = params.get("course") || "";
  const [imagePreview, setImagePreview] = useState<string | null>("");
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(BannerSchema),
  });

  const { data } = useGetBanner(id);
  const { isPending: updatePending, mutateAsync } = useBannerUpdate(id);
  let { mutateAsync: mutateAsyncDelete, isPending: deleteIsPending } =
    useBannerDelete(id);

  // let handleEditFunc = (value: string) => {
  //   if (value === "edit") {
  //     setDisabled(false);
  //   }

  //   if (value === "Cancel") {
  //     reset();
  //     setValue("banner_title", data?.banner_title || "");
  //     setValue("selectImage", data?.image || "");
  //     setValue("price", data?.price || "");
  //     setValue("from_date", data?.from_date || "");
  //     setValue("venue", data?.venue || "");
  //     setValue("to_date", data?.to_date || "");
  //     setValue("program_timing", data?.program_timing || "");
  //     setImagePreview("");
  //     setDisabled(true);
  //   }
  // };

  useEffect(() => {
    setValue("banner_title", data?.banner_title || "");
    setValue("selectImage", data?.image || "");
    setValue("price", data?.price || "");
    setValue("from_date", data?.from_date || "");
    setValue("course_name", data?.course_name || "");
    setValue("student_enrolled", data?.student_enrolled || "");
    setValue("venue", data?.venue || "");
    setValue("to_date", data?.to_date || "");
    setValue("program_timing", data?.program_timing || "");
  }, [data]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  let toValidate: (keyof updateBannerType)[] = [
    "banner_title",
    "price",
    "from_date",
    "student_enrolled",
    "course_name",
    "to_date",
    "venue",
    "program_timing",
    "image",
  ];

  let validatePreVal = (Items: updateBannerType) => {
    let value = 0;
    let formData = new FormData();
    for (let i = 0; i < toValidate.length; i++) {
      const key = toValidate[i];
      if (!data) return;
      if (Items[key] === data[key]) {
        value++;
      } else {
        formData.append(key, Items[key]);
      }
    }

    return value < 4 ? formData : "value has not changed";
  };

  let handleDeleteFunc = async () => {
    await mutateAsyncDelete();
  };
  return (
    <>
     
        <form
          className="space-y-4"
          onSubmit={handleSubmit(async (data: any) => {
            let prevVal = validatePreVal(data);
            if (prevVal === "value has not changed") {
              toast.success("there is not changes happen ");
            } else {
              let response = await mutateAsync({
                data: prevVal,
                publicId: data.publicId,
              });
              if (response.status === 200) {
                setDisabled(true);
                setImagePreview("");
              }
            }
          })}>
          <TextArea
            label="Banner Title"
            name="banner_title"
            disabled={disabled}
            errors={errors}
            register={register}
          />
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label
                className=" text-sm mb-1 font-medium text-slate-600 "
                htmlFor="">
                From Date
              </label>
              <Calender
                closeOnDateSelect
                dateType="from_date"
                setDate={setFromDate}
                setValue={setValue}>
                <Button
                  variant={"outline"}
                  className={cn(
                    " w-full justify-start mt-[0.2rem] font text-left font-normal",
                    !data.from_date && "text-muted-foreground"
                  )}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.from_date ? (
                    format(data.from_date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </Calender>
              <p className="text-red-500 text-xs mt-1 ml-1 font-normal">
                {!fromDate &&
                  errors["from_date"] &&
                  errors["from_date"]?.message}
              </p>
            </div>
            <div>
              <label
                className=" text-sm mb-2 font-medium text-slate-600 "
                htmlFor="">
                To Date
              </label>
              <Calender
                closeOnDateSelect
                dateType="to_date"
                setDate={setToDate}
                setValue={setValue}>
                <Button
                  variant={"outline"}
                  className={cn(
                    " w-full justify-start text-left mt-[0.2rem] font-normal",
                    !data.to_date && "text-muted-foreground"
                  )}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.to_date ? (
                    format(data.to_date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </Calender>
              <p className="text-red-500 text-xs mt-1 ml-1 font-normal">
                {!toDate && errors["to_date"] && errors["to_date"]?.message}
              </p>
            </div>
          </div>
          <Inputs
            label="Venue"
            name="venue"
            disabled={disabled}
            type="text"
            errors={errors}
            register={register}
          />
          <div className="grid grid-cols-2 gap-5">
            <Inputs
              label="Student Enrolled"
              name="student_enrolled"
              disabled={disabled}
              type="text"
              errors={errors}
              register={register}
            />
            <Inputs
              label="Course Name"
              name="course_name"
              disabled={disabled}
              type="text"
              errors={errors}
              register={register}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <Inputs
              label="Program Timing"
              disabled={disabled}
              name="program_timing"
              type="text"
              errors={errors}
              register={register}
            />
            <Inputs
              label="Price"
              disabled={disabled}
              name="price"
              type="text"
              errors={errors}
              register={register}
            />
          </div>

          <div>
            {!imagePreview ? (
              <div
                className={clsx("relative", disabled && "cursor-not-allowed")}>
                <Image
                  src={data?.image || ""}
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

          {/* <div className="flex gap-4 mt-6">
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
          </div> */}

          <button
            disabled={deleteIsPending}
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
    
    </>
  );
};

export default EditBanner;
