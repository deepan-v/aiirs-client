import { content_upload } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useMultiCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["multi_course"],
    mutationFn: async (data: FormData) => {
      const res = await axios.post(content_upload.multi_course_update, data); 
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["multi_course_get"],
      });
      toast.success("Course added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed ");
    },
  });
};


export let useMultiCourseDelete = (id:string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["multi_course_delete"],
    mutationFn: async () => {
      let res = await axios.delete(content_upload.multi_course_delete(id));
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["multi_course_get"],
      });
     
      toast.success("Course Deleted Successfully");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed while deleting");
    },
  });
};
