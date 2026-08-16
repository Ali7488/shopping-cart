import App from "./App";
import Cart from "./pages/Cart";
import ErrorElement from "./pages/ErrorElement";
import Home from "./pages/Home";
import Shop from "./pages/Shop";

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];
