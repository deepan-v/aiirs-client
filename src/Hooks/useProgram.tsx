
import { content_upload } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";


type overview = {
  program_overview: string;
  youtube_link: string;
  course_id:string
};

export let useProgramOverview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["program-overview-content"],
    mutationFn: async (data: overview) => {
      let res = await axios.post(content_upload.program_overview, data);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["program-overview-content-get"],
      });
   
      toast.success("Data Posted Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "failed while fetching");
    },
  });
};

export let useDeleteProgramOverview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["program-overview-content-delete"],
    mutationFn: async (id:string) => {
      let res = await axios.delete(content_upload.program_delete(id));
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["program-overview-content-get"],
      });
      toast.success("Data updated Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "failed while fetching");
    },
  });
};

