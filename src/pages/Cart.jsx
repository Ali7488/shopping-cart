import { useOutletContext } from "react-router";

export default function Cart() {
  const { products, cart } = useOutletContext();
  return (
    <>
      <h1>Your Items</h1>
      {/* Note that the div is temporary until component is made*/}
      {cart.map((item) => {
        const cartItem = products.find((product) => product.id === item.id);
        return (
          <div>
            <img src={cartItem.image} /> {cartItem.title} {item.quantity}
          </div>
        );
      })}
    </>
  );
}
