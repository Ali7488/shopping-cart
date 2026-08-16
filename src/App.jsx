import { useState } from "react";
import { Link, Outlet } from "react-router";
import { useShopApi } from "./hooks/useShopApi";
import "./styles/App.css";

function App() {
  // Retrieves products from fakeShop API
  const { error, loading, products } = useShopApi();

  // Cart state, uses ID to retrieve product information from the products array
  const [cart, setCart] = useState([]);

  function handleAddToCart(itemId, itemQuantity) {
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

  return (
    <>
      <nav>
        <h1>Shopster</h1>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      <main>
        <Outlet context={{ products, loading, error, cart, handleAddToCart }} />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
