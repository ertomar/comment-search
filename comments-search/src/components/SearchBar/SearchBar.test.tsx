import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  it("should render search input and button", () => {
    const onSubmit = vi.fn();
    render(<SearchBar onSubmit={onSubmit} />);

    expect(
      screen.getByPlaceholderText("Search comments...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(
      screen.getByText(/enter at least 3 characters/i)
    ).toBeInTheDocument();
  });

  it("should disable submit button when query is less than 3 characters", () => {
    const onSubmit = vi.fn();
    render(<SearchBar onSubmit={onSubmit} />);

    const button = screen.getByRole("button", { name: /search/i });
    expect(button).toBeDisabled();
  });

  it("should enable submit button when query is 3 or more characters", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SearchBar onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("Search comments...");
    const button = screen.getByRole("button", { name: /search/i });

    await user.type(input, "abc");

    expect(button).not.toBeDisabled();
  });

  it("should call onSubmit with query when form is submitted with valid input", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SearchBar onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("Search comments...");
    await user.type(input, "test query");

    const button = screen.getByRole("button", { name: /search/i });
    await user.click(button);

    expect(onSubmit).toHaveBeenCalledWith("test query");
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("should not call onSubmit when query is less than 3 characters", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SearchBar onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("Search comments...");
    await user.type(input, "ab");

    const form = input.closest("form");
    if (form) {
      form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should trim whitespace when validating query", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SearchBar onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("Search comments...");
    const button = screen.getByRole("button", { name: /search/i });

    // Type only spaces
    await user.type(input, "   ");

    expect(button).toBeDisabled();
  });

  it("should update input value when typing", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SearchBar onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText(
      "Search comments..."
    ) as HTMLInputElement;

    await user.type(input, "searching");

    expect(input.value).toBe("searching");
  });

  it("should handle disabled state", () => {
    const onSubmit = vi.fn();
    render(<SearchBar onSubmit={onSubmit} disabled />);

    const input = screen.getByPlaceholderText("Search comments...");
    expect(input).toBeDisabled();
  });

  it("should submit form on Enter key press", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SearchBar onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText("Search comments...");
    await user.type(input, "test query{Enter}");

    expect(onSubmit).toHaveBeenCalledWith("test query");
  });
});
