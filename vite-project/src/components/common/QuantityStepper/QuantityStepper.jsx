import './QuantityStepper.css'

function QuantityStepper({ value, min = 1, max = 1, onChange }) {
  function decrease() {
    onChange(Math.max(min, value - 1))
  }

  function increase() {
    onChange(Math.min(max, value + 1))
  }

  function handleInput(e) {
    const next = Number(e.target.value)
    if (Number.isNaN(next)) return
    onChange(Math.max(min, Math.min(max, next)))
  }

  return (
    <div className="quantity-stepper">
      <button
        type="button"
        className="quantity-stepper__btn"
        onClick={decrease}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <input type="number" className="quantity-stepper__value" value={value} onChange={handleInput} min={min} max={max} />
      <button
        type="button"
        className="quantity-stepper__btn"
        onClick={increase}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}

export default QuantityStepper
