import CourseMain from "@/_Components/MainWrapper/Courses/CourseMain";
import React, { Suspense } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-[calc(min-100vh-30px)] p-6 bg-white">
      <Suspense fallback={null}>
        <CourseMain />
      </Suspense>
    </div>
  );
};

export default page;

