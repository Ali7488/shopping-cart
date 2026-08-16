import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { routes } from "./routes.jsx";

describe("App Routing", () => {
  it("renders homepage at /", () => {
    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Welcome to Shopster" })).toBeInTheDocument();
  });

  it("renders shop at /shop", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Our Products" })).toBeInTheDocument();
  });

  it("renders cart at /cart", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Your Items" })).toBeInTheDocument();
  });

  it("renders the errorElement page when an invalid link is used", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/does-not-exist"],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading", { name: "Page Not Found" })).toBeInTheDocument();
  });

  it("lets the links on the navbar take us to the shop page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const shopLink = screen.getByRole("link", { name: "Shop" });

    await user.click(shopLink);

    expect(screen.getByRole("heading", { name: "Our Products" })).toBeInTheDocument();
  });

  it("lets the links on the navbar take us to the cart page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const cartLink = screen.getByRole("link", { name: "Cart" });

    await user.click(cartLink);

    expect(screen.getByRole("heading", { name: "Your Items" })).toBeInTheDocument();
  });

  it("lets the links on the navbar take us back to the Home page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"],
    });
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const homeLink = screen.getByRole("link", { name: "Home" });

    await user.click(homeLink);

    expect(screen.getByRole("heading", { name: "Welcome to Shopster" })).toBeInTheDocument();
  });
});
