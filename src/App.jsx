import { Link, Outlet } from "react-router";
import { useShopApi } from "./hooks/useShopApi";
import "./styles/App.css";

function App() {
  const { error, loading, products } = useShopApi();

  return (
    <>
      <nav>
        <h1>Shopster</h1>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      <main>
        <Outlet context={{ products, loading, error }} />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
