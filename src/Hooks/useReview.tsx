// useLearnCard;
import { content_upload } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["review_image_post"],
    mutationFn: async (data: FormData) => {
      const res = await axios.post(content_upload.review_image_post, data); // content_upload.mentor should be something like "/api/mentor"
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews_get"],
      });
      toast.success("Card added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add Card");
    },
  });
};


export let useReviewDelete = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["reviews_delete" , id],
    mutationFn: async () => {
      let res = await axios.delete(content_upload.reviews_delete(id));
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews_get"],
      });
    
      toast.success("Data Deleted Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "failed while fetching");
    },
  });
};