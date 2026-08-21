export function ButtonGroup({
  handleIncrement,
  handleDecrement,
  handleInput,
  quantity,
  handleBlur,
}) {
  return (
    <div className="flex justify-center items-center py-2">
      <button
        type="button"
        aria-label="reduce quantity"
        onClick={handleDecrement}
        className="text-xl bg-[var(--color-primary)] p-2 text-[var(--color-text-inverse)] rounded-l-lg hover:bg-[var(--color-primary-hover)] font-bold active:scale-95 transition-transform"
      >
        -
      </button>

      <input
        type="number"
        value={quantity}
        min={1}
        max={99}
        onChange={handleInput}
        onBlur={handleBlur}
        className="text-xl bg-[var(--color-primary-soft)] text-center p-2 text-[var(--color-text)] focus:ring-[var(--color-primary)] focus:ring-1 focus:outline-none font-bold w-full"
      />

      <button
        type="button"
        aria-label="increase quantity"
        onClick={handleIncrement}
        className="text-xl text-center bg-[var(--color-primary)] p-2 text-[var(--color-text-inverse)] rounded-r-lg hover:bg-[var(--color-primary-hover)] font-bold active:scale-95 transition-transform"
      >
        +
      </button>
    </div>
  );
}
