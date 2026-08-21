import { useOutletContext } from "react-router";
import Card from "../components/Card";

export default function Shop() {
  const { products, handleAddToCart, loading, error } = useOutletContext();

  if (loading) return <h3>Loading our AMAZING products...</h3>;
  if (error) return <h3>Server Error</h3>;

  return (
    <section className="grid grid-row-2 space-y-8 md:space-y-12 w-full p-4">
      <h1 className="text-2xl md:text-4xl font-bold text-[var(--color-text)]">Our Products:</h1>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => {
          return (
            <Card
              key={product.id}
              image={product.image}
              rating={product.rating}
              title={product.title}
              price={product.price}
              id={product.id}
              handleAddToCart={handleAddToCart}
            />
          );
        })}
      </div>
    </section>
  );
}
