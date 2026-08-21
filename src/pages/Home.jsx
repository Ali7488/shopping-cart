import { Link } from "react-router";

export default function Home() {
  return (
    <section className="w-full space-y-8 md:space-y-12 py-4">
      <div className="flex flex-col items-center text-center gap-3 md:gap-5 max-w-4xl mx-auto">
        <p className="text-xs md:text-sm uppercase tracking-wide font-semibold text-[var(--color-primary)]">
          Simple shopping. Good products.
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-text)]">
          Welcome to Shopster
        </h1>

        <p className="text-base md:text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          Browse our collection of clothing, accessories, electronics, and more.
        </p>

        <Link
          className="transition-colors font-semibold text-md md:text-xl rounded-lg inline-flex bg-[var(--color-primary)] text-[var(--color-text-inverse)] p-3 hover:bg-[var(--color-primary-hover)] hover:scale-105 active:scale-97 transition-transform"
          to="/shop"
        >
          Shop Now
        </Link>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
        <article className="p-2 md:p-4 flex flex-col gap-1 md:gap-2 bg-[var(--color-surface)] text-[var(--color-text-inverse)] border-[var(--color-border)] rounded-lg shadow-sm hover:shadow-lg  hover:scale-102 transition-transform transition-shadow">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
            Quality Products
          </h2>
          <p className="text-base md:text-lg text-[var(--color-text)] max-w-2xl leading-relaxed">
            Browse a selection of products across multiple categories.
          </p>
        </article>

        <article className="p-2 md:p-4 flex flex-col gap-1 md:gap-2 bg-[var(--color-surface)] text-[var(--color-text-inverse)] border-[var(--color-border)] rounded-lg shadow-sm hover:shadow-lg hover:scale-102 transition-transform transition-shadow">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
            Easy Shopping
          </h2>
          <p className="text-base md:text-lg text-[var(--color-text)] max-w-2xl leading-relaxed">
            Choose your quantities and manage your cart with ease.
          </p>
        </article>

        <article className="p-2 md:p-4 flex flex-col gap-1 md:gap-2 bg-[var(--color-surface)] text-[var(--color-text-inverse)] border-[var(--color-border)] rounded-lg shadow-sm hover:shadow-lg  hover:scale-102 transition-transform transition-shadow">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
            Simple Checkout
          </h2>
          <p className="text-base md:text-lg text-[var(--color-text)] max-w-2xl leading-relaxed">
            Review your order and see your total before checking out.
          </p>
        </article>
      </section>
    </section>
  );
}
