"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  children: ReactNode;
  setDate: (value: any | undefined) => void;
  setValue: (value: any | undefined, item: any) => any;
  dateType: string;
  closeOnDateSelect: boolean;
};

const Calender = ({
  dateType,
  setDate,
  children,
  setValue,
  closeOnDateSelect,
}: Props) => {
  let [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          onSelect={(value: any) => {
            let Date = format(value, "dd-MMM-yyyy");
            setValue(dateType, Date);
            setDate(Date);
            if (closeOnDateSelect) {
              setOpen(false);
            }
          }}
          initialFocus
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
    </Popover>
  );
};

export default Calender;
