"use client";

import Inputs from "@/libs/Inputs";
import { UserSchema } from "@/Schema/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { PiSpinnerBold } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Hooks/useAuth";

const Form = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserSchema), 
  });

  let { mutateAsync, isPending } = useAuth();

  const handleForm = async (data: any) => {
    let response = await mutateAsync(data);
    if (response.status === 200) {
      router.push("/admin/create_course");
    }
  };

  return (
    <div className="grid h-screen place-items-center bg-white">
      <form
        onSubmit={handleSubmit(handleForm)}
        className="max-w-[400px] w-full shadow-xl py-10 px-4 border-[#096731]/50 rounded-md border-2">
        <h1 className="mb-6  font-medium text-xl text-[#096731]">
          Welcome to Admin Site
        </h1>
        <div className="space-y-4">
          <Inputs
            type="email"
            name="email"
            register={register}
            placeholder="Enter the Email"
            label="Email"
            errors={errors}
          />
          <Inputs
            type="password"
            name="password"
            register={register}
            placeholder="Enter the password"
            label="Password"
            errors={errors}
          />
        </div>
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
    </div>
  );
};

export default Form;
