import type { Comment } from "../types";
import { api } from "../utils";

export const getComments = async () => {
  const response = await api.get<Comment[]>("/comments");
  return response.data;
};
