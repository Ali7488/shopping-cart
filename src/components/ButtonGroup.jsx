export function ButtonGroup({
  handleIncrement,
  handleDecrement,
  handleInput,
  quantity,
  minQuantity,
}) {
  return (
    <div className="buttonGroup">
      <button type="button" aria-label="reduce quantity" onClick={handleDecrement}>
        -
      </button>
      <input type="number" value={quantity} min={minQuantity} max={99} onChange={handleInput} />
      <button type="button" aria-label="increase quantity" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
}
