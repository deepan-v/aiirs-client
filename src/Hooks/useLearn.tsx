// useLearnCard;
import { content_upload } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useLearnCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["learn_content_post"],
    mutationFn: async (data: FormData) => {
      const res = await axios.post(content_upload.learn_card, data); // content_upload.mentor should be something like "/api/mentor"
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["learn_content_get"],
      });
     
      toast.success("Card added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add Card");
    },
  });
};

export let useLearnDelete = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["learn_content_delete"],
    mutationFn: async () => {
      let res = await axios.delete(content_upload.learn_delete(id));
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["learn_content_get"],
      });
     
     
      toast.success("Data Deleted Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "failed while fetching");
    },
  });
};

