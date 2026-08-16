import { Star } from "lucide-react";
import { useState } from "react";

export default function Card({ image, rating, title, id, handleAddToCart }) {
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
      <h4>{title}</h4>
      {Array.from({ length: numberOfStars }, (_, index) => {
        return <Star size={10} strokeWidth={1.5} key={index} />;
      })}

      <ButtonGroup
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handleInput={handleInput}
        quantity={quantity}
      />
      <button type="button" onClick={() => handleAddToCart(id, quantity)}>
        Add To Cart{" "}
      </button>
    </div>
  );
}

function ButtonGroup({ handleIncrement, handleDecrement, handleInput, quantity }) {
  return (
    <div className="buttonGroup">
      <button type="button" aria-label="reduce quantity" onClick={handleDecrement}>
        -
      </button>
      <input type="number" value={quantity} min={1} max={99} onChange={handleInput} />
      <button type="button" aria-label="increase quantity" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
}
