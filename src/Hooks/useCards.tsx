   
import { content_upload } from "@/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type updateBannerType = {
  _id: string;
  banner_title: string;
  price: string;
  image: string;
  venue: string;
  program_timing: string;
  to_date: string;
  from_date: string;
};

export let useCards = () => {
  return useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      let response = await axios.get(content_upload.get_all_cards);
      return response.data;
    },
  });
};
export let useCardById = (id:string) => {
  return useQuery({
    queryKey: ["card", id],
    queryFn: async () => {
      let response = await axios.get(content_upload.get_course_by_id(id));
      return response.data;
    },
  });
};

export let useGetBanner = (id: string) => {

  return useQuery({
    queryKey: ["banner_content_get"],
    queryFn: async () => {
      let res = await axios.get(content_upload.get_banner(id));
      if (res.data !== "Banner not found") {
        return res.data.data ;
      } else {
        return null;
      }
    },
  });
  
};

export let useGetProgramOverview = (id: string) => {
  return useQuery({
    queryKey: ["program-overview-content-get"],
    queryFn: async () => {
      let res = await axios.get(content_upload.get_program(id));
      // debugger
      if (res.data !== "Program not found") {
        return res.data.data;
      } else {
        return null;
      }
    },
  });
};
export let useGetMentor = (id: string) => {
  return useQuery({
    queryKey: ["mentor_content_get"],
    queryFn: async () => {
      let res = await axios.get(content_upload.get_mentors(id));
        return res.data.data;
    },
  });
};
export let useGetMultiple = (id: string) => {
  return useQuery({
    queryKey: ["multi_course_get"],
    queryFn: async () => {
      let res = await axios.get(content_upload.multi_course_get(id));
      return res.data.data;
    },
  });
};

export let useGetLearnCard = (id: string) => {
  return useQuery({
    queryKey: ["learn_content_get"],
    queryFn: async () => {
      let res = await axios.get(content_upload.learn_content_get(id));
      return res.data.data;
    },
  });
};
export let useGetReviews = (id: string) => {
  return useQuery({
    queryKey: ["reviews_get", id],
    queryFn: async () => {
      let res = await axios.get(content_upload.reviews_get(id));
      return res.data.data;
    },
  });
};


export let useNotification = () => {
  return useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      let res = await axios.get(content_upload.get_all_request);
      return res.data;
    },

  });
};
export let useGetProgram = (id:string) => {
  return useQuery({
    queryKey: ["program_content_get"],
    queryFn: async () => {
      let res = await axios.get(content_upload.program_content_get(id));
      return res.data.data;
    },
  });
};

