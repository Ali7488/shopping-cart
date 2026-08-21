import { Star } from "lucide-react";
import { useState } from "react";
import { ButtonGroup } from "./ButtonGroup";

export default function Card({ image, rating, title, id, updateCartQuantity, price }) {
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
    <div className="productCard" id={id}>
      <img src={image} alt={title} />
      <div className="cardHeader">
        <h4>{title}</h4>
        <h3>${price}</h3>
      </div>
      {Array.from({ length: numberOfStars }, (_, index) => {
        return <Star size={10} strokeWidth={1.5} key={index} />;
      })}

      <ButtonGroup
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handleInput={handleInput}
        quantity={quantity}
        minQuantity={1}
      />
      <button type="button" onClick={() => updateCartQuantity(id, quantity)}>
        Add To Cart{" "}
      </button>
    </div>
  );
}
