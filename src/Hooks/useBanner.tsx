

import { content_upload } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";



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

export let useBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["banner-content"],
    mutationFn: async (data: FormData) => {
      let res = await axios.post(content_upload.banner_title, data);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banner_content_get"],
      });
     
      toast.success("Data Posted Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "failed while fetching");
    },
  });
};
export let useBannerUpdate = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["banner_content_update"],
    mutationFn: async ({ data, publicId }: { data: any; publicId: string }) => {
      let res = await axios.patch(content_upload.banner_update(id), data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner_content_get"] });
    
      toast.success("Data Posted Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "failed while fetching");
    },
  });
};

export let useBannerDelete = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["banner_content_delete"],
    mutationFn: async () => {
      let res = await axios.delete(content_upload.banner_delete(id));
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banner_content_get"],
      });
     
      toast.success("Data Deleted Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "failed while fetching");
    },
  });
};




export let useCardUpdate = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["card_update", id],
    mutationFn: async ({ data, publicId }: { data: any; publicId: string }) => {
      let res = await axios.patch(
        content_upload.card_update(id, publicId),
        data
      );
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey[0] === "cards";
        },
      });
      toast.success("Course Card Updated Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "failed while updating");
    },
  });
};
export let useCardDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["card_delete"],
    mutationFn: async (id: string) => {
      let res = await axios.delete(content_upload.card_delete(id));
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey[0] === "cards";
        },
      });
      toast.success("Course Card Deleted Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "failed while Deleting");
    },
  });
};
