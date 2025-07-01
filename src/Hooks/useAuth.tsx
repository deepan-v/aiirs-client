import { auth_api, content_upload } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export let useAuth = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => {
      let fetch = await axios.post(auth_api.login_auth, data);
      return fetch;
    },

    onSuccess: () => {
      toast.success("Login Successful");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Login Failed");
    },
  });
};
export let useCard = () => {
  const queryClient = useQueryClient()
  return useMutation({
    
    mutationKey: ["card"],
    mutationFn: async (data: FormData) => {
      let fetch = await axios.post(content_upload.card_creation, data);
      return fetch;
    },

    onSuccess: () => {
      toast.success("Course Card Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to Create");
    },
    
  });
};






