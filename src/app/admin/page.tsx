import MainWrapper from "@/_Components/MainWrapper/MainWrapper";

import React, { Suspense } from "react";

const page = () => {
  return (
    <section>
      {/* <Suspense fallback={null}> */}
        <MainWrapper />
      {/* </Suspense> */}
    </section>
  );
};

export default page;
