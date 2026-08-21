import { Link } from "react-router";

export default function Home() {
  return (
    <section className="home">
      <div className="hero">
        <p>Simple shopping. Good products.</p>

        <h1>Welcome to Shopster</h1>

        <p>Browse our collection of clothing, accessories, electronics, and more.</p>

        <Link to="/shop">Shop Now</Link>
      </div>

      <section className="homeFeatures">
        <article>
          <h2>Quality Products</h2>
          <p>Browse a selection of products across multiple categories.</p>
        </article>

        <article>
          <h2>Easy Shopping</h2>
          <p>Choose your quantities and manage your cart with ease.</p>
        </article>

        <article>
          <h2>Simple Checkout</h2>
          <p>Review your order and see your total before checking out.</p>
        </article>
      </section>
    </section>
  );
}
