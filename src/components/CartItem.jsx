import { Trash } from "lucide-react";
import { useState } from "react";
import { ButtonGroup } from "./ButtonGroup";

export default function CartItem({ product, quantity, updateCartQuantity }) {
  const subtotal = product.price * quantity;

  const [inputValue, setInputValue] = useState(null);

  const displayedQuantity = inputValue ?? quantity;

  function handleIncrement() {
    if (quantity < 99) {
      setInputValue(null);
      updateCartQuantity(product.id, quantity + 1);
    }
  }

  function handleDecrement() {
    if (quantity > 0) {
      setInputValue(null);
      updateCartQuantity(product.id, quantity - 1);
    }
  }

  function handleInput(event) {
    const value = event.target.value;

    if (value === "") {
      setInputValue("");
      return;
    }

    const quantityInput = Number(value);
    const clampedValue = Math.min(99, Math.max(1, quantityInput));

    setInputValue(clampedValue);
    updateCartQuantity(product.id, clampedValue);
  }

  function handleBlur() {
    setInputValue(null);
  }

  function handleDelete() {
    updateCartQuantity(product.id, 0);
  }
  return (
    <section className="flex flex-col md:flex-row p-6 gap-6 border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)]">
      <img
        src={product.image}
        alt={product.title}
        className="h-100 md:h-56 object-contain shrink-0 self-center md:self-auto"
      />
      <div className="flex flex-col gap-8 w-full md:ml-auto md:items-end md:text-right">
        <div className="inline-flex flex-row gap-6 items-center justify-center w-full md:w-80">
          <h4>{product.title}</h4>
          <button
            type="button"
            onClick={handleDelete}
            aria-label="delete button"
            className="font-bold hover:text-[var(--color-danger)] active:scale-95 transform text-xl"
          >
            <Trash size={50} />
          </button>
        </div>

        <div className="mt-auto">
          <h3>Price per item: ${product.price.toFixed(2)}</h3>
          <ButtonGroup
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            handleInput={handleInput}
            quantity={displayedQuantity}
            handleBlur={handleBlur}
          />
          <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
        </div>
      </div>
    </section>
  );
}
