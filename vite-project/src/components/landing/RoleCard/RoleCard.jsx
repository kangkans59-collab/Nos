import './RoleCard.css'

function RoleCard({ icon, label, description, onClick }) {
  return (
    <button type="button" className="role-card" onClick={onClick}>
      <span className="role-card__icon">{icon}</span>
      <span className="role-card__label">{label}</span>
      {description && <span className="role-card__description">{description}</span>}
    </button>
  )
}

export default RoleCard
