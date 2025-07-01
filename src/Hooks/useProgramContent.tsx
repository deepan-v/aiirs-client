import { content_upload } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useProgramContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["program_content"],
    mutationFn: async (data: any) => {
      const res = await axios.post(content_upload.program_content, data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["program_content_get"] });
      toast.success("Course Content added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed ");
    },
  });
};

export const useProgramContentDelete = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["program_content_delete"],
    mutationFn: async () => {
      const res = await axios.delete(content_upload.program_content_delete(id));
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["program_content_get"] });

      toast.success("Course Content added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed ");
    },
  });
};
