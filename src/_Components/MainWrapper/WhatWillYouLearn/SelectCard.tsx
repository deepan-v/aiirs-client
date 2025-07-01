"use client";

import React, { useMemo, useTransition } from "react";
import { Controller } from "react-hook-form";
import * as FaIcons from "react-icons/fa";

type Props = {
  control: any;
  setSearch: (value: string) => void;
  search: string;
  errors: any;
};

const SelectCard = ({ control, setSearch, search, errors }: Props) => {
    const [isPending, startTransition] = useTransition();
  const iconOptions = useMemo(() => {
    return Object.keys(FaIcons)
      .filter((key) => key.toLowerCase().includes(search.toLowerCase()))
      .map((iconName) => ({
        label: iconName,
        value: iconName,
        icon: FaIcons[iconName as keyof typeof FaIcons],
      }));
  }, [search]);

  return (
    <div>
      <label className="text-sm mb-1 font-medium text-slate-600">
        Search and select an icon
      </label>
      <input
        type="text"
        placeholder="Search icons..."
        className="border shadow-xs border-slate-200 w-full mb-2 font-normal text-slate-600 rounded-md py-[0.380rem] px-2 text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Controller
        name="icon"
        control={control}
        render={({ field }) => (
          <div className=" max-h-[200px] space-y-3 overflow-y-auto border p-2 rounded-md">
            {iconOptions.length
              ? iconOptions.map(({ value, icon: Icon }) => (
                  <div
                    key={value}
                    className={`p-2 border rounded-md flex gap-3  items-center text-center text-sm cursor-pointer ${
                      field.value === value
                        ? "bg-green-100 border-green-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => field.onChange(value)}>
                    <Icon className="text-xl mb-1" />
                    {value}
                  </div>
                ))
              : "icon not found"}
          </div>
        )}
      />
      <p className="text-red-500 text-xs mt-1 ml-1 font-normal">
        {errors.icon?.message}
      </p>
    </div>
  );
};

export default SelectCard;
