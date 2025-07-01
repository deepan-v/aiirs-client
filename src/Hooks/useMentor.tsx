import { content_upload } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
 // Adjust path if needed

export const useMentor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["mentor-content"],
    mutationFn: async (data: FormData) => {
      const res = await axios.post(content_upload.mentor_post, data); // content_upload.mentor should be something like "/api/mentor"
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mentor_content_get"],
      });
     
      toast.success("Mentor added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add mentor");
    },
  });
};


export let useMentorDelete = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["Mentor_delete"],
    mutationFn: async () => {
      let res = await axios.delete(content_upload.mentor_delete(id));
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mentor_content_get"],
      });
     
      toast.success("Data Deleted Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "failed while fetching");
    },
  });
};
