import type { Comment } from "@/types";
import { api } from "@/utils";

export interface GetCommentsParams {
  query?: string;
  limit?: number;
  page?: number;
}

export const getComments = async ({
  limit = 20,
  page = 1,
  query,
}: GetCommentsParams = {}) => {
  const response = await api.get<Comment[]>("/comments", {
    params: {
      _limit: limit,
      _page: page,
      q: query,
    },
  });
  return response.data;
};
