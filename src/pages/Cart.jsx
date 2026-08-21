import { useOutletContext } from "react-router";
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
      <>
        <h1>Your Items:</h1>
        <h2>You dont currently have any items in cart</h2>
      </>
    );
  }

  return (
    <>
      <h1>Your Items</h1>
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
      <h3>Your Total: {cartTotal.toFixed(2)}</h3>
      <button type="button" aria-disabled={true} disabled>
        Checkout (Dummy button)
      </button>
    </>
  );
}
