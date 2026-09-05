import './Button.css'

function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  disabled = false,
  onClick,
  ...rest
}) {
  const classNames = ['btn', `btn--${variant}`, `btn--${size}`, fullWidth ? 'btn--full' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classNames} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

export default Button
