import { useOutletContext } from "react-router";
import Card from "../components/Card";

export default function Shop() {
  const { products, handleAddToCart, loading, error } = useOutletContext();

  if (loading) return <h3>Loading our AMAZING products...</h3>;
  if (error) return <h3>Server Error</h3>;
  return (
    <>
      <h1>Our Products:</h1>

      {products.map((product) => {
        return (
          <Card
            key={product.id}
            image={product.image}
            rating={product.rating}
            title={product.title}
            id={product.id}
            handleAddToCart={handleAddToCart}
          />
        );
      })}
    </>
  );
}
