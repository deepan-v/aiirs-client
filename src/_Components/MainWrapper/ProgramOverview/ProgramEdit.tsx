"use client";
import { useGetProgramOverview } from "@/Hooks/useCards";
import { useDeleteProgramOverview } from "@/Hooks/useProgram";
import Inputs from "@/libs/Inputs";
import TextArea from "@/libs/TextArea";
import { overViewSchema } from "@/Schema/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PiSpinnerBold } from "react-icons/pi";

type formType = {
  program_overview: string;
  youtube_link: string;
};

const ProgramOverviewEdit = () => {
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

  const params = useSearchParams();

  const id = params.get("course") || "";
  let { data } = useGetProgramOverview(id);
  const [disabled, setDisabled] = useState(true);

  const { isPending, mutateAsync: mutateAsyncDelete } =
    useDeleteProgramOverview();

  let toValidate: (keyof formType)[] = ["program_overview", "youtube_link"];

  let validatePreVal = (Items: formType) => {
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
    await mutateAsyncDelete(data?._id);
  };

  useEffect(() => {
    setValue("program_overview", data?.program_overview || "");
    setValue("youtube_link", data?.youtube_link || "");
  }, [data]);

  return (
    <form className="space-y-4">
      <TextArea
        label="Program Overview"
        name="program_overview"
        disabled={disabled}
        errors={errors}
        register={register}
      />
      <Inputs
        label="Youtube Link"
        name="youtube_link"
        type="text"
        disabled={disabled}
        errors={errors}
        register={register}
      />

      <button
        disabled={isPending}
        onClick={handleDeleteFunc}
        type="button"
        className="cursor-pointer w-full  bg-[#096731] text-white py-2 mt-2 rounded">
        {!isPending ? (
          "Delete"
        ) : (
          <PiSpinnerBold className="text-center text-lg m-auto animate-spin " />
        )}
      </button>
    </form>
  );
};

export default ProgramOverviewEdit;
