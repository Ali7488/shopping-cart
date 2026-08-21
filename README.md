# Shopster

Shopster is a responsive storefront built with React. It fetches products from the Fake Store API, organizes the application into routed pages, and keeps cart state centralized so quantities and totals remain consistent across the interface.

[Live Demo](https://shopping-cart-atop3.vercel.app)

> **Status:** In development. The core browsing and cart flows are implemented; checkout is intentionally non-functional

## Features

- Browse products retrieved from the Fake Store API
- Loading and error states handled through a custom `useShopApi` hook
- Home, shop, cart, and not-found routes with React Router
- Responsive product grid and cart layout
- Reusable product cards, cart items, and quantity controls
- Quantity validation between 1 and 99 on product cards
- Add, update, and remove cart items through one state-update function
- Live cart badge, per-item subtotals, and overall cart total
- Empty-cart state with a route back to the shop

## Built With

- React 19
- React Router
- Tailwind CSS
- Vite
- Vitest
- React Testing Library
- Lucide React
- Fake Store API

## Architecture

`App.jsx` owns the shared product and cart state. It exposes that state and the `updateCartQuantity` action to routed pages through React Router's outlet context.

- `useShopApi` owns product fetching, loading, and error state.
- `Shop` maps API products into reusable `Card` components.
- `Cart` joins cart entries with product details and calculates the order total.
- `updateCartQuantity` is the single mutation boundary for adding, updating, and removing cart entries.
- `ButtonGroup` provides the shared quantity-control interface used by product cards and cart items.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone https://github.com/Ali7488/shopping-cart.git
cd shopping-cart
npm install
npm run dev
```

## Available Scripts

| Command                | Purpose                                  |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the Vite development server        |
| `npm run build`        | Create a production build                |
| `npm run preview`      | Preview the production build locally     |
| `npm test`             | Run Vitest in watch mode                 |
| `npm run test:run`     | Run the test suite once                  |
| `npm run lint`         | Run ESLint                               |
| `npm run format`       | Format the repository with Prettier      |
| `npm run format:check` | Check formatting without modifying files |

## Current Limitations

- Checkout is a disabled demonstration button; there is no payment flow.
- Cart state is not persisted after a page refresh.
- Product availability depends on the external Fake Store API.

## Acknowledgements

Product data is provided by the [Fake Store API](https://fakestoreapi.com/). This project was created as part of [The Odin Project](https://www.theodinproject.com/) React curriculum.
