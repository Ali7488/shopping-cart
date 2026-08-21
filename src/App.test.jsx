import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useShopApi } from "./hooks/useShopApi";
import { routes } from "./routes.jsx";

vi.mock("./hooks/useShopApi", () => ({
  useShopApi: vi.fn(),
}));

const fakeProducts = [
  {
    id: 1,
    title: "Test Jacket",
    price: 25,
    image: "test-jacket.jpg",
    rating: {
      rate: 4.2,
      count: 10,
    },
  },
];

function renderRoute(path = "/") {
  const router = createMemoryRouter(routes, {
    initialEntries: [path],
  });

  render(<RouterProvider router={router} />);

  return router;
}

describe("Shopster", () => {
  beforeEach(() => {
    useShopApi.mockReturnValue({
      products: fakeProducts,
      loading: false,
      error: null,
    });
  });

  it("renders the home page", () => {
    renderRoute("/");

    expect(screen.getByRole("navigation")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Welcome to Shopster",
      }),
    ).toBeInTheDocument();
  });

  it("renders products on the shop page", () => {
    renderRoute("/shop");

    expect(
      screen.getByRole("heading", {
        name: "Our Products:",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Test Jacket")).toBeInTheDocument();
    expect(screen.getByText("$25.00")).toBeInTheDocument();
  });

  it("shows the empty cart state", () => {
    renderRoute("/cart");

    expect(
      screen.getByRole("heading", {
        name: "Your Cart:",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Oh no, your cart is empty.")).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "Browse Products",
      }),
    ).toHaveAttribute("href", "/shop");
  });

  it("renders the error page for an invalid route", () => {
    renderRoute("/does-not-exist");

    expect(
      screen.getByRole("heading", {
        name: "Page Not Found",
      }),
    ).toBeInTheDocument();
  });

  it("adds the selected quantity to the cart and shows the notification", async () => {
    const user = userEvent.setup();

    renderRoute("/shop");

    const increaseButton = screen.getByRole("button", {
      name: "increase quantity",
    });

    await user.click(increaseButton);
    await user.click(increaseButton);

    await user.click(
      screen.getByRole("button", {
        name: "Add To Cart",
      }),
    );

    const notification = screen.getByRole("status");

    expect(notification).toHaveTextContent("Added to cart");
    expect(notification).toHaveTextContent("Test Jacket");

    const navigation = screen.getByRole("navigation");
    const cartLink = within(navigation).getByRole("link", {
      name: /Cart/,
    });

    expect(cartLink).toHaveTextContent("3");
  });

  it("can navigate from the add-to-cart notification to the cart", async () => {
    const user = userEvent.setup();

    renderRoute("/shop");

    await user.click(
      screen.getByRole("button", {
        name: "increase quantity",
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add To Cart",
      }),
    );

    const notification = screen.getByRole("status");

    await user.click(
      within(notification).getByRole("link", {
        name: "Go To Cart",
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: "Your Cart:",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Test Jacket")).toBeInTheDocument();
    expect(screen.getByText("Subtotal: $50.00")).toBeInTheDocument();
    expect(screen.getByText("Your Total: 50.00")).toBeInTheDocument();
  });

  it("updates an existing cart item instead of creating a duplicate", async () => {
    const user = userEvent.setup();

    renderRoute("/shop");

    const addButton = screen.getByRole("button", {
      name: "Add To Cart",
    });

    await user.click(addButton);

    await user.click(
      screen.getByRole("button", {
        name: "Continue Shopping",
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: "increase quantity",
      }),
    );

    await user.click(addButton);

    const navigation = screen.getByRole("navigation");
    const cartLink = within(navigation).getByRole("link", {
      name: /Cart/,
    });

    expect(cartLink).toHaveTextContent("2");
  });

  it("removes an item when its quantity is decreased from one to zero", async () => {
    const user = userEvent.setup();

    renderRoute("/shop");

    await user.click(
      screen.getByRole("button", {
        name: "Add To Cart",
      }),
    );

    const notification = screen.getByRole("status");

    await user.click(
      within(notification).getByRole("link", {
        name: "Go To Cart",
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: "reduce quantity",
      }),
    );

    expect(screen.getByText("Oh no, your cart is empty.")).toBeInTheDocument();
  });
});
