import { useState } from "react";
import { Link, Outlet } from "react-router";
import { useShopApi } from "./hooks/useShopApi";

function App() {
  const { error, loading, products } = useShopApi();

  const [cart, setCart] = useState([]);
  const [cartNotification, setCartNotification] = useState(null);

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
            }

            return item;
          })
        : [...prev, { id: itemId, quantity: itemQuantity }],
    );
  }

  function handleAddToCart(itemId, itemQuantity, itemTitle) {
    updateCartQuantity(itemId, itemQuantity);
    setCartNotification(itemTitle);
  }

  const cartTotalItems = cart.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);

  return (
    <div className="grid grid-rows-[auto_minmax(0,1fr)_auto] min-h-dvh">
      <div
        role="status"
        aria-live="polite"
        className={`fixed top-0 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-lg transition duration-300 ${
          cartNotification
            ? "translate-y-4 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <p className="font-semibold text-lg">Added to cart</p>

        <p className="mt-1 text-[var(--color-text-muted)]">{cartNotification}</p>

        <div className="mt-4 flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => setCartNotification(null)}
            className="rounded-lg border border-[var(--color-border)] px-4 py-2 font-semibold transition hover:bg-[var(--color-surface-muted)]"
          >
            Continue Shopping
          </button>

          <Link
            to="/cart"
            onClick={() => setCartNotification(null)}
            className="rounded-lg bg-[var(--color-primary)] px-4 py-2 font-semibold text-[var(--color-text-inverse)] transition hover:bg-[var(--color-primary-hover)]"
          >
            Go To Cart
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-2 md:gap-6 py-6 border-b bg-[var(--color-surface)] border-[var(--color-border)] px-2 md:px-6">
        <Link className="text-2xl md:text-4xl mr-auto font-bold text-[var(--color-primary)]" to="/">
          Shopster
        </Link>

        <Link className="text-base md:text-3xl px-1 md:px-3 transition-colors" to="/">
          Home
        </Link>

        <Link className="text-base md:text-3xl px-1 md:px-3 transition-colors" to="/shop">
          Shop
        </Link>

        <Link
          className="text-base md:text-3xl transition-colors inline-flex gap-1 md:gap-4 justify-center items-center"
          to="/cart"
        >
          Cart
          <span className="font-bold bg-[var(--color-primary)] text-[var(--color-text-inverse)] rounded-full px-2 min-w-4 h-6 md:min-w-8 md:h-8 inline-flex justify-center items-center text-base">
            {cartTotalItems}
          </span>
        </Link>
      </nav>

      <main className="w-full mx-auto max-w-7xl p-2 md:p-6">
        <Outlet
          context={{
            products,
            loading,
            error,
            cart,
            updateCartQuantity,
            handleAddToCart,
          }}
        />
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
