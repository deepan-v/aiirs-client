import MainWrapper from "@/_Components/MainWrapper/MainWrapper";

import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={null}>
      <MainWrapper />
    </Suspense>
  );
};

export default page;
