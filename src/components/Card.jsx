import { Star } from "lucide-react";
import { useState } from "react";
import { ButtonGroup } from "./ButtonGroup";

export default function Card({ image, rating, title, id, handleAddToCart, price }) {
  const [quantity, setQuantity] = useState(1);
  const numberOfStars = Math.round(rating.rate);

  function handleIncrement() {
    if (quantity < 99) setQuantity((prev) => prev + 1);
  }

  function handleDecrement() {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  }

  function handleInput(event) {
    const quantityInput = Number(event.target.value);
    const clampedValue = Math.min(99, Math.max(1, quantityInput));
    setQuantity(clampedValue);
  }

  return (
    <div className="flex flex-col p-2 md:p-4 gap-2 md:gap-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm hover:scale-102 transition hover:shadow-lg transition">
      <img src={image} alt={title} className="w-full object-contain h-100 md:h-75" />
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-lg text-[var(--color-text)] leading-tight">{title}</h4>
        <p className="text-base leading-tight">${price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-1">
        {Array.from({ length: numberOfStars }, (_, index) => {
          return <Star size={20} strokeWidth={1.5} key={index} />;
        })}
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <ButtonGroup
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          handleInput={handleInput}
          quantity={quantity}
          minQuantity={1}
        />
        <button
          type="button"
          onClick={() => handleAddToCart(id, quantity, title)}
          className="w-full py-2 md:py-4 rounded-lg bg-[var(--color-primary)] text-[var(--color-text-inverse)] font-semibold text-lg hover:bg-[var(--color-primary-hover)] transition active:scale-95 transition duration-100"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
