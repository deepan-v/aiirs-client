import React from "react";
import { UseFormRegister,} from "react-hook-form";
import clsx from "clsx";

type Props = {
  placeholder?: string;
  type: string;
  register: UseFormRegister<any>;
  label: string;
  value?: string;
  disabled?:boolean
  errors: any;
  name: string;
};

const Inputs = (props: Props) => {
  return (
    <div className="flex flex-col">
      <label className=" text-sm mb-1 font-medium text-slate-600 " htmlFor="">
        {props.label}
      </label>
      <input
        type={props.type}
        disabled={props.disabled}
        placeholder={props.placeholder}
        value={props.value}
        className={clsx(
          "border shadow-xs border-slate-200 font-normal text-slate-600 rounded-md py-[0.380rem] px-2 text-sm",
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

export default Inputs;
