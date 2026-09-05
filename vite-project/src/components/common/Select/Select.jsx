import './Select.css'

function Select({ id, value, onChange, options, placeholder, disabled }) {
  return (
    <select id={id} className="select-input" value={value} onChange={onChange} disabled={disabled}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => {
        const optValue = typeof opt === 'string' ? opt : opt.value
        const optLabel = typeof opt === 'string' ? opt : opt.label
        return (
          <option key={optValue} value={optValue}>
            {optLabel}
          </option>
        )
      })}
    </select>
  )
}

export default Select
