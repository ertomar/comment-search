import type { Comment } from "@/types";

export const mockComments: Comment[] = [
  {
    id: 1,
    postId: 1,
    name: "Test Comment 1",
    email: "test1@example.com",
    body: "This is a test comment body that is longer than 64 characters to test truncation functionality",
  },
  {
    id: 2,
    postId: 1,
    name: "Test Comment 2",
    email: "test2@example.com",
    body: "Short comment",
  },
  {
    id: 3,
    postId: 2,
    name: "Another Test Comment",
    email: "test3@example.com",
    body: "This comment contains the search term 'example' for testing search functionality",
  },
];

export const mockComment: Comment = mockComments[0];
