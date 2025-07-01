import clsx from "clsx";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  placeholder?: string;
  register: UseFormRegister<any>;
  label: string;
  errors: any;
  value?: string;
  disabled?: boolean;
  name: string;
};

const TextArea = (props: Props) => {
  return (
    <div className="flex flex-col">
      <label className=" text-sm mb-1 font-medium text-slate-600 " htmlFor="">
        {props.label}
      </label>
      <textarea
        disabled={props.disabled}
        value={props.value}
        className={clsx(
          "border shadow-xs border-slate-200 font-normal text-slate-600 rounded-md py-[0.380rem] px-2 text-sm resize-none",
          props.disabled && "cursor-not-allowed select-none"
        )}
        {...props.register(props.name)}
      />
      <p className="text-red-500 text-xs mt-1 ml-1 font-normal">
        {props.errors[props.name] && props.errors[props.name]?.message}
      </p>
    </div>
  );
};

export default TextArea;
