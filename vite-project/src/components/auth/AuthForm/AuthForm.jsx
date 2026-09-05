import Button from '../../common/Button/Button.jsx'
import './AuthForm.css'

function AuthForm({ title, children, submitLabel, onSubmit, footer }) {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2 className="auth-form__title">{title}</h2>
      <div className="auth-form__fields">{children}</div>
      <Button type="submit" fullWidth>
        {submitLabel}
      </Button>
      {footer && <div className="auth-form__footer">{footer}</div>}
    </form>
  )
}

export default AuthForm
