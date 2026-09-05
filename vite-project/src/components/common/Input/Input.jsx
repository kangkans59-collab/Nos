import './Input.css'

function Input({ id, type = 'text', value, onChange, placeholder, disabled, min, max, step, ...rest }) {
  return (
    <input
      id={id}
      type={type}
      className="text-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      min={min}
      max={max}
      step={step}
      {...rest}
    />
  )
}

export default Input
