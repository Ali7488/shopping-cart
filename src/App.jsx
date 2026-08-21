import { useState } from "react";
import { Link, Outlet } from "react-router";
import { useShopApi } from "./hooks/useShopApi";

function App() {
  // Retrieves products from fakeShop API
  const { error, loading, products } = useShopApi();

  // Cart state, uses ID to retrieve product information from the products array
  const [cart, setCart] = useState([]);

  function updateCartQuantity(itemId, itemQuantity) {
    if (itemQuantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== itemId));
      return;
    }

    setCart((prev) =>
      prev.some((item) => item.id === itemId)
        ? prev.map((item) => {
            if (item.id === itemId) {
              return { ...item, quantity: itemQuantity };
            } else return item;
          })
        : [...prev, { id: itemId, quantity: itemQuantity }],
    );
  }

  const cartTotalItems = cart.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);

  return (
    <div className="grid grid-rows-[auto_minmax(0,1fr)_auto] min-h-dvh">
      <nav className="flex  items-center  gap-2 md:gap-6 py-6 border-b bg-[var(--color-surface)] border-[var(--color-border)]  px-2 md:px-6">
        <Link className="text-2xl md:text-4xl mr-auto font-bold text-[var(--color-primary)]" to="/">
          Shopster
        </Link>
        <Link className="text-md md:text-3xl px-1 md:px-3 transition-colors" to="/">
          Home
        </Link>
        <Link className="text-md md:text-3xl px-1 md:px-3 transition-colors" to="/shop">
          Shop
        </Link>
        <Link
          className="text-md md:text-3xl transition-colors inline-flex gap-1 md:gap-4 justify-center items-center"
          to="/cart"
        >
          Cart{" "}
          <span className="font-bold bg-[var(--color-primary)] text-[var(--color-text-inverse)] rounded-full px-2 min-w-4 h-6 md:min-w-8 md:h-8 inline-flex justify-center items-center text-base">
            {cartTotalItems}
          </span>
        </Link>
      </nav>
      <main className="w-full mx-auto max-w-7xl p-2 md:p-6">
        <Outlet context={{ products, loading, error, cart, updateCartQuantity }} />
      </main>
      <footer className="flex justify-center items-center bg-[var(--color-surface)] p-4">
        <p>
          Built by: <a href="https://www.github.com/Ali7488">Mohannad Ali</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
