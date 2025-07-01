"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as FaIcons from "react-icons/fa";
import { useState, useMemo } from "react";
import { PiSpinnerBold } from "react-icons/pi";
import { featureCardSchema } from "@/Schema/Form"; // You should define this schema
// Your custom mutation hook
import Inputs from "@/libs/Inputs";
import TextArea from "@/libs/TextArea";
import { useLearnCard } from "@/Hooks/useLearn";
import SelectCard from "./SelectCard";
import { useSearchParams } from "next/navigation";

type FeatureCardType = {
  icon: string;
  title: string;
  description: string;
};

const FeatureCardForm = () => {
  const params = useSearchParams();

  const id = params.get("course") || "";
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FeatureCardType>({
    resolver: zodResolver(featureCardSchema),
  });

  const [search, setSearch] = useState("");

  const { mutateAsync, isPending } = useLearnCard();

  const onSubmit = async (data: any) => {
    const res = await mutateAsync({ ...data, id });
    if (res.status === 200) {
      reset();
      setSearch("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-[35rem] m-auto mt-16">
      <h1 className="text-center font-medium text-2xl">What Will You Learn Card for Create</h1>

      {/* Icon Picker with Search */}
      <SelectCard
        control={control}
        errors={errors}
        setSearch={setSearch}
        search={search}
      />

      <Inputs
        label="Title"
        name="title"
        type="text"
        register={register}
        errors={errors}
      />

      <TextArea
        label="Description"
        name="description"
        register={register}
        errors={errors}
      />

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

export default FeatureCardForm;
