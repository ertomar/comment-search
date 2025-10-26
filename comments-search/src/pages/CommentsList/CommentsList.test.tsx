import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test/utils";
import CommentsList from "./CommentsList";
import * as commentService from "@/services/comment";
import { mockComments } from "@/test/mockData";

// Mock the comment service
vi.mock("@/services/comment");

// Helper function to fill search input only
async function fillSearchInput(query: string) {
  const user = userEvent.setup();
  const input = screen.getByTestId("search-input");
  const searchButton = screen.getByRole("button", { name: /search/i });

  await user.clear(input);
  await user.type(input, query);

  return { user, input, searchButton };
}

// Helper function to fill search input and submit
async function fillSearchAndSubmit(query: string) {
  const { user, input, searchButton } = await fillSearchInput(query);
  await user.click(searchButton);

  return { user, input, searchButton };
}

describe("CommentsList Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render search section", () => {
    vi.mocked(commentService.getComments).mockResolvedValue([]);
    renderWithProviders(<CommentsList />);

    expect(
      screen.getByPlaceholderText("Search comments...")
    ).toBeInTheDocument();
  });

  it("should not render pagination controls when there are no comments", async () => {
    vi.mocked(commentService.getComments).mockResolvedValue([]);
    renderWithProviders(<CommentsList />);

    await fillSearchAndSubmit("test query");

    // Wait for initial load
    await waitFor(() => {
      expect(commentService.getComments).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1 })
      );
    });

    const nextButton = screen.queryByRole("button", { name: /next/i });
    const prevButton = screen.queryByRole("button", { name: /previous/i });

    expect(nextButton).not.toBeInTheDocument();
    expect(prevButton).not.toBeInTheDocument();
  });

  it("should render pagination controls when there are comments", async () => {
    vi.mocked(commentService.getComments).mockResolvedValue(mockComments);

    renderWithProviders(<CommentsList />);

    await fillSearchAndSubmit("test query");

    const nextButton = screen.getByRole("button", { name: /next/i });
    const prevButton = screen.getByRole("button", { name: /previous/i });

    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
  });

  it("should display loading state when fetching comments", async () => {
    vi.mocked(commentService.getComments).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    renderWithProviders(<CommentsList />);

    await fillSearchAndSubmit("test query");

    await waitFor(() => {
      expect(screen.getByText(/Searching comments/i)).toBeInTheDocument();
    });
  });

  it("should display comments after successful fetch", async () => {
    vi.mocked(commentService.getComments).mockResolvedValue(mockComments);

    renderWithProviders(<CommentsList />);

    await fillSearchAndSubmit("test query");

    await waitFor(() => {
      expect(screen.getByText(mockComments[0].name)).toBeInTheDocument();
    });
  });

  it("should handle search submission", async () => {
    vi.mocked(commentService.getComments).mockResolvedValue(mockComments);

    renderWithProviders(<CommentsList />);

    await fillSearchAndSubmit("test query");

    await waitFor(() => {
      expect(commentService.getComments).toHaveBeenCalledWith(
        expect.objectContaining({
          query: "test query",
        })
      );
    });
  });

  it("should disable next button when there are no more comments", async () => {
    vi.mocked(commentService.getComments).mockResolvedValue(mockComments);

    renderWithProviders(<CommentsList />);

    await fillSearchAndSubmit("test query");

    // Wait for initial load
    await waitFor(() => {
      expect(commentService.getComments).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1 })
      );
    });

    const nextButton = screen.getByRole("button", { name: /next/i });

    expect(nextButton).toBeDisabled();
  });

  it("should display error state on fetch failure", async () => {
    vi.mocked(commentService.getComments).mockRejectedValue(
      new Error("Network error")
    );

    renderWithProviders(<CommentsList />);

    await fillSearchAndSubmit("test query");

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it("should display empty state when no comments found", async () => {
    vi.mocked(commentService.getComments).mockResolvedValue([]);

    renderWithProviders(<CommentsList />);

    await waitFor(() => {
      expect(
        screen.getByText(/Enter a search term above to find relevant comments/i)
      ).toBeInTheDocument();
    });
  });
});
