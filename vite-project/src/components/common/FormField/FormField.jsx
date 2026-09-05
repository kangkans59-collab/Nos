import './FormField.css'

function FormField({ label, htmlFor, hint, error, children }) {
  return (
    <div className="form-field">
      {label && (
        <label className="form-field__label" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
      {hint && !error && <p className="form-field__hint">{hint}</p>}
      {error && <p className="form-field__error">{error}</p>}
    </div>
  )
}

export default FormField
