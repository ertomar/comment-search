import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CommentCard from "./CommentCard";
import { mockComment, mockComments } from "@/test/mockData";

describe("CommentCard Component", () => {
  it("should render comment name", () => {
    render(<CommentCard comment={mockComment} />);

    expect(screen.getByText(mockComment.name)).toBeInTheDocument();
  });

  it("should render comment email", () => {
    render(<CommentCard comment={mockComment} />);

    expect(screen.getByText(mockComment.email)).toBeInTheDocument();
  });

  it("should render post ID", () => {
    render(<CommentCard comment={mockComment} />);

    expect(screen.getByText(`Post #${mockComment.postId}`)).toBeInTheDocument();
  });

  it("should render comment ID", () => {
    render(<CommentCard comment={mockComment} />);

    expect(screen.getByText(`Comment #${mockComment.id}`)).toBeInTheDocument();
  });

  it("should truncate body text longer than 64 characters", () => {
    const longComment = mockComments[0]; // Has body longer than 64 chars
    render(<CommentCard comment={longComment} />);

    const displayedText = screen.getByText(/This is a test comment body/);
    expect(displayedText.textContent).toHaveLength(67); // 64 chars + "..."
    expect(displayedText.textContent).toMatch(/\.\.\.$/);
  });

  it("should not truncate body text shorter than 64 characters", () => {
    const shortComment = mockComments[1]; // Has short body
    render(<CommentCard comment={shortComment} />);

    expect(screen.getByText(shortComment.body)).toBeInTheDocument();
    expect(screen.getByText(shortComment.body).textContent).not.toMatch(
      /\.\.\.$/
    );
  });

  it("should display exactly 64 characters plus ellipsis when truncated", () => {
    const longComment = {
      ...mockComment,
      body: "a".repeat(100), // 100 characters
    };

    render(<CommentCard comment={longComment} />);

    const bodyElement = screen.getByText(/a+\.\.\./);
    expect(bodyElement.textContent).toHaveLength(67); // 64 + "..."
  });

  it("should render all required icons", () => {
    const { container } = render(<CommentCard comment={mockComment} />);

    // Check for icon presence by looking for svg elements
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });

  it("should have proper accessibility structure", () => {
    render(<CommentCard comment={mockComment} />);

    // Check for heading
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent(mockComment.name);
  });
});
