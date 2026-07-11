export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  small = false,
  label = 'Quantity',
}) {
  return (
    <div className={small ? 'qty qty--small' : 'qty'} aria-label={label}>
      <button
        type="button"
        className="qty__btn"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        &minus;
      </button>
      <span className="qty__value" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="qty__btn"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
