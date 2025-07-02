"use client";

import Inputs from "@/libs/Inputs";
import TextArea from "@/libs/TextArea";
import { BannerSchema } from "@/Schema/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import { IoCloudUpload } from "react-icons/io5";
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useForm,
} from "react-hook-form";
import Image from "next/image";
import Calender from "@/libs/Calender";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useBanner } from "@/Hooks/useBanner";
import { PiSpinnerBold } from "react-icons/pi";
import { useSearchParams } from "next/navigation";

type formType = {
  banner_title: string;
  from_date: Date | any;
  to_date: Date | any;
  venue: string;
  price: string;
  course_name: string;
  program_timing: string;
  selectImage: string;
};

const Banner = () => {
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
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
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  let { mutateAsync, isPending } = useBanner();

  let onSubmit: any = async (data: formType) => {
    let formData = new FormData();
    formData.append("banner_title", data.banner_title);
    formData.append("from_date", data.from_date);
    formData.append("to_date", data.to_date);
    formData.append("id", id);
    formData.append("price", data.price);
    formData.append("venue", data.venue);
    formData.append("course_name", data.course_name);
    formData.append("program_timing", data.program_timing);
    formData.append("selectImage", data.selectImage);

    let postBanner = await mutateAsync(formData);
    if (postBanner.status === 200) {
      reset();
      setFromDate("");
      setToDate("");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        label="Banner Title"
        name="banner_title"
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
                !fromDate && "text-muted-foreground"
              )}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </Calender>
          <p className="text-red-500 text-xs mt-1 ml-1 font-normal">
            {!fromDate && errors["from_date"] && errors["from_date"]?.message}
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
                !toDate && "text-muted-foreground"
              )}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </Calender>
          <p className="text-red-500 text-xs mt-1 ml-1 font-normal">
            {!toDate && errors["to_date"] && errors["to_date"]?.message}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Inputs
          label="Program Timing"
          name="program_timing"
          type="text"
          errors={errors}
          register={register}
        />
        <Inputs
          label="Venue"
          name="venue"
          type="text"
          errors={errors}
          register={register}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Inputs
          label="Course Name"
          name="course_name"
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

      {!imagePreview ? (
        <div>
          <label
            htmlFor="image"
            className="border-dashed border-2 w-3xs  py-6 flex justify-center flex-col cursor-pointer rounded-md m-auto items-center">
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
          <PiSpinnerBold className="text-center text-xl m-auto animate-spin " />
        )}
      </button>
    </form>
  );
};

export default Banner;
