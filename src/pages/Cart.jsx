import { Link, useOutletContext } from "react-router";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { updateCartQuantity, products, cart } = useOutletContext();
  const cartTotal = cart.reduce((accumulator, item) => {
    const cartItem = products.find((product) => product.id === item.id);
    const subtotal = cartItem.price * item.quantity;
    return accumulator + subtotal;
  }, 0);

  if (cart.length === 0) {
    return (
      <section className="flex flex-col space-y-16 w-full">
        <h1>Your Cart:</h1>
        <div className="flex flex-col items-center text-center gap-3 md:gap-5 max-w-4xl mx-auto">
          <p className="text-2xl font-semibold">Oh no, your cart is empty.</p>
          <Link
            to="/shop"
            className="transition font-semibold text-base md:text-xl rounded-lg inline-flex bg-[var(--color-primary)] text-[var(--color-text-inverse)] p-3 hover:bg-[var(--color-primary-hover)] hover:scale-105 active:scale-97 transition"
          >
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full space-y-16">
      <h1>Your Cart:</h1>
      <div className="flex flex-col gap-6">
        {cart.map((item) => {
          const cartItem = products.find((product) => product.id === item.id);
          return (
            <CartItem
              key={item.id}
              product={cartItem}
              quantity={item.quantity}
              updateCartQuantity={updateCartQuantity}
            />
          );
        })}
      </div>

      <div className="flex flex-col items-end gap-4">
        <p className="text-xl md:text-2xl font-bold">Your Total: {cartTotal.toFixed(2)}</p>
        <button
          type="button"
          aria-disabled={true}
          disabled
          className="w-full py-2 md:py-4 rounded-lg bg-[var(--color-primary)] text-[var(--color-text-inverse)] font-semibold text-lg hover:bg-[var(--color-primary-hover)] transition-colors active:scale-95 transition-transform duration-100"
        >
          Checkout (Dummy button)
        </button>
      </div>
    </section>
  );
}
