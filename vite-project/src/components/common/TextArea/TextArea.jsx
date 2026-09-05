import './TextArea.css'

function TextArea({ id, value, onChange, placeholder, rows = 4, disabled, ...rest }) {
  return (
    <textarea
      id={id}
      className="textarea-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      {...rest}
    />
  )
}

export default TextArea
