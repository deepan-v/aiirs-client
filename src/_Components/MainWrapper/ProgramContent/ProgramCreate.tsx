"use client";

import Inputs from "@/libs/Inputs";
import { CourseSchema, ProgramContentSchema } from "@/Schema/Form"; // define this in zod
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";

import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { IoCloudUpload } from "react-icons/io5";
import { PiSpinnerBold } from "react-icons/pi";
import { useMultiCourse } from "@/Hooks/useMultiCourse";
import { useSearchParams } from "next/navigation";
import { useProgramContent } from "@/Hooks/useProgramContent";
// your custom API hook

const ProgramCreate = () => {
  const params = useSearchParams();

  const id = params.get("course") || "";

  const [state, setState] = useState<any>({});
  const [count, setCount] = useState(0);

  const handleItemIncrement = () => {
    setCount((prev) => prev + 1);
    // setItemValue([...itemValue, `item${count}`]);
    // itemValue.push(`item${count}`);
    setState({ ...state, [`item${count}`]: "" });
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProgramContentSchema),
  });

  const { mutateAsync, isPending } = useProgramContent();

  const onSubmit = async (data: any) => {
    let program_items = [];
    let newArray = { ...state };
    for (let key in newArray) {
      program_items.push(newArray[key]);
    }

    console.log(program_items);
    const res = await mutateAsync({ title: data.title, program_items, id });
    console.log(res);
    if (res.status === 200) {
      reset();
      setCount(0);
      setState({});
    }
  };

  const handleDeleteItem = (val: any) => {
    console.log(val);
    let value: any = { ...state };
    let newValue: any = {};
    for (let key in state) {
      console.log(key);
      if (key !== val) {
        newValue[key] = value[key];
      }
      console.log(newValue);
    }
    setState(newValue);
  };

  const handleArrayInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="space-y-4   max-w-[35rem] m-auto mt-16"
      onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center font-medium text-2xl mb-5">
        Create Program Content
      </h1>
      <Inputs
        label="Title"
        name="title"
        placeholder="Write program content title..."
        type="text"
        register={register}
        errors={errors}
      />

      {/* Second Course */}
      {}
      <div
        onClick={handleItemIncrement}
        className="cursor-pointer flex items-center justify-center w-full  gap-3 bg-[#096731]/90 text-white h-9 rounded-md">
       Add Items  <IoMdAdd size={20} className="mt-[0.175rem]" />
      </div>
      {Object.keys(state).map((val, index) => {
        return (
          <div
            key={index}
            className="grid grid-cols-[1fr_auto] gap-3 items-center">
            <input
              onChange={handleArrayInput}
              type="text"
              name={val}
              className="border w-full shadow-xs border-slate-200 font-normal text-slate-600 rounded-md py-[0.380rem] px-2 text-sm"
            />
            <div
              onClick={() => handleDeleteItem(val)}
              className="cursor-pointer grid place-items-center  bg-red-600 text-white w-10 h-9 rounded-md">
              <FiMinus />
            </div>
          </div>
        );
      })}

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

export default ProgramCreate;
