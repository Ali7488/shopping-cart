import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, expect, it, vi } from "vitest";
import { routes } from "./routes";

afterEach(() => vi.unstubAllGlobals());

it("keeps shopping and cart totals working offline and protects the cart during catalogue recovery", async () => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Offline")));
  const user = userEvent.setup();
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ["/shop"] })} />);
  expect(await screen.findByRole("complementary", { name: "Sample catalogue" })).toHaveTextContent(
    "fictional products",
  );
  expect(screen.getByText("Everyday Backpack")).toBeInTheDocument();
  const retry = screen.getByRole("button", { name: "Retry live catalogue" });
  expect(retry).toBeEnabled();
  await user.click(screen.getAllByRole("button", { name: "Add To Cart" })[0]);
  expect(retry).toBeDisabled();
  await user.click(within(screen.getByRole("status")).getByRole("link", { name: "Go To Cart" }));
  expect(screen.getByText("Subtotal: $48.00")).toBeInTheDocument();
  expect(screen.getByText("Your Total: $48.00")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Checkout/ })).toBeDisabled();
  await user.click(screen.getByRole("button", { name: "delete button" }));
  expect(screen.getByText("Oh no, your cart is empty.")).toBeInTheDocument();
  expect(retry).toBeEnabled();
  await user.click(retry);
  await screen.findByRole("button", { name: "Retry live catalogue" });
  expect(fetch).toHaveBeenCalledTimes(2);
});
