import { useState } from "react";
import { Link, Outlet } from "react-router";
import { useShopApi } from "./hooks/useShopApi";
import "./styles/App.css";

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
    <>
      <nav>
        <h1>Shopster</h1>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">
          Cart <span>{cartTotalItems}</span>
        </Link>
      </nav>
      <main>
        <Outlet context={{ products, loading, error, cart, updateCartQuantity }} />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
