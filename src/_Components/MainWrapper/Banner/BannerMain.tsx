"use client";

import { useSearchParams } from "next/navigation";
import EditBanner from "./EditBanner";
import Banner from "./Banner";
import { useGetBanner } from "@/Hooks/useCards";

type Props = {};

const BannerMain = (props: Props) => {
  const params = useSearchParams();

  const id = params.get("course") || "";

  const { data, isPending } = useGetBanner(id);


  return (
    <div>
      <h1 className="my-8 font-medium text-center text-2xl">
        Banner Content Post
      </h1>
      { !isPending &&  data !== "Banner not found" ? <EditBanner /> : <Banner />}
      <div></div>
    </div>
  );
};

export default BannerMain;
