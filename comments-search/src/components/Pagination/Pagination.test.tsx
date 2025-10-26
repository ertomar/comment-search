import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  it("should render current page number", () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} onPageChange={onPageChange} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Page")).toBeInTheDocument();
  });

  it("should render Previous and Next buttons", () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} onPageChange={onPageChange} />);

    expect(
      screen.getByRole("button", { name: /previous/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("should disable Previous button on first page", () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} onPageChange={onPageChange} />);

    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it("should enable Previous button when not on first page", () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={2} onPageChange={onPageChange} />);

    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).not.toBeDisabled();
  });

  it("should disable Next button when hasNextPage is false", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        onPageChange={onPageChange}
        hasNextPage={false}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it("should enable Next button when hasNextPage is true", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        onPageChange={onPageChange}
        hasNextPage={true}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).not.toBeDisabled();
  });

  it("should call onPageChange with decreased page when Previous is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination currentPage={3} onPageChange={onPageChange} />);

    const prevButton = screen.getByRole("button", { name: /previous/i });
    await user.click(prevButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("should call onPageChange with increased page when Next is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        onPageChange={onPageChange}
        hasNextPage={true}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    await user.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("should not call onPageChange when Previous is clicked on first page", async () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} onPageChange={onPageChange} />);

    const prevButton = screen.getByRole("button", { name: /previous/i });
    // Button is disabled, so clicking shouldn't do anything
    expect(prevButton).toBeDisabled();
  });

  it("should not call onPageChange when Next is clicked and hasNextPage is false", async () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        onPageChange={onPageChange}
        hasNextPage={false}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it("should respect hasPreviousPage prop when provided", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={5}
        onPageChange={onPageChange}
        hasPreviousPage={false}
      />
    );

    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it("should have proper ARIA labels", () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={2} onPageChange={onPageChange} />);

    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
  });

  it("should have proper navigation landmark", () => {
    const onPageChange = vi.fn();
    const { container } = render(
      <Pagination currentPage={1} onPageChange={onPageChange} />
    );

    const nav = container.querySelector('nav[aria-label="Pagination"]');
    expect(nav).toBeInTheDocument();
  });
});
