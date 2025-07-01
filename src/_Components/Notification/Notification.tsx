"use client";

import { useNotification } from "@/Hooks/useCards";
import React from "react";

const Notification = () => {
  let { data, isPending, isError } = useNotification();

  return (
    <div className="py-7 px-5 h-screen bg-white">
      <h1 className="mb-6 font-medium text-2xl text-center">Notification</h1>
      {isPending && <h1>Loading...</h1>}
      {!isPending && !isError && (
        <div className="grid grid-cols-3 gap-4">
          {data &&
            data?.data.map((value: any, index: number) => {
              return (
                <div
                  key={index}
                  className=" bg-white border rounded-xl p-6 space-y-3">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {value?.name}
                  </h2>
                  <p className="text-gray-600">
                    <span className="font-medium">Phone:</span> {value.phone}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span> {value.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Message:</span> {value.message}
                  </p>
                </div>
              );
            })}
        </div>
      )}
      {isError&& <h1>Error Occurred</h1>}
    </div>
  );
};

export default Notification;
