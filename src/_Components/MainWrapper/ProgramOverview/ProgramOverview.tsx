"use client";
import { useProgramOverview } from "@/Hooks/useProgram";
import Inputs from "@/libs/Inputs";
import TextArea from "@/libs/TextArea";
import { overViewSchema } from "@/Schema/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { PiSpinnerBold } from "react-icons/pi";

type formType = {
  program_overview: string;
  youtube_link: string;
};

const ProgramOverview = () => {
   const params = useSearchParams();
    const id = params.get("course") || "";
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(overViewSchema),
  });

  let { mutateAsync, isPending } = useProgramOverview();

  let onSubmit: any = async (data: formType) => {
    let formData = new FormData();
    formData.append("program_overview", data.program_overview);
    formData.append("youtube_link", data.youtube_link);

    let postProgram = await mutateAsync({...data , course_id:id});
    if (postProgram.status === 200) {
      reset();
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        label="Program Overview"
        name="program_overview"
        errors={errors}
        register={register}
      />
      <Inputs
        label="Youtube Link"
        name="youtube_link"
        type="text"
        errors={errors}
        register={register}
      />

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

export default ProgramOverview;
