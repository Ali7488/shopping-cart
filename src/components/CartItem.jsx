import { ButtonGroup } from "./ButtonGroup";

export default function CartItem({ product, quantity, updateCartQuantity }) {
  const subtotal = product.price * quantity;

  function handleIncrement() {
    if (quantity < 99) updateCartQuantity(product.id, quantity + 1);
  }
  function handleDecrement() {
    if (quantity > 0) updateCartQuantity(product.id, quantity - 1);
  }
  function handleInput(event) {
    const quantityInput = Number(event.target.value);
    const clampedValue = Math.min(99, Math.max(1, quantityInput));
    updateCartQuantity(product.id, clampedValue);
  }
  function handleDelete() {
    updateCartQuantity(product.id, 0);
  }

  return (
    <>
      <img src={product.image} alt={product.title} />
      <div className="itemHeader">
        <h4>{product.title}</h4>
        <button type="button" onClick={handleDelete} aria-label="delete button">
          X
        </button>
      </div>

      <div className="controlSection">
        <h3>Price per item: {product.price}</h3>
        <ButtonGroup
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          handleInput={handleInput}
          quantity={quantity}
          minQuantity={0}
        />
        <h3>Subtotal: {subtotal}</h3>
      </div>
    </>
  );
}
