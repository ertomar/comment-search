import { useQuery } from "@tanstack/react-query";

import { getComments, type GetCommentsParams } from "@/services";

export const useComments = (params: GetCommentsParams = {}) => {
  return useQuery({
    queryKey: ["comments", params],
    queryFn: () => getComments(params),
    enabled: !!params.query,
  });
};
