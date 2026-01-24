import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api/api";


export const useFetchMe = () => {
  return useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
    retry: 1,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
