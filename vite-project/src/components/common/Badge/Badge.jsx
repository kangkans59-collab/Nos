import './Badge.css'

const TONE_CLASS = {
  success: 'badge--success',
  warning: 'badge--warning',
  danger: 'badge--danger',
  neutral: 'badge--neutral',
  info: 'badge--info',
}

function Badge({ children, tone = 'neutral' }) {
  return <span className={`badge ${TONE_CLASS[tone] || TONE_CLASS.neutral}`}>{children}</span>
}

export default Badge
