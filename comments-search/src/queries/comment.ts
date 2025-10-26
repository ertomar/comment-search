import { useQuery } from "@tanstack/react-query";

import { getComments } from "../services";

export const useComments = () => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });
};
