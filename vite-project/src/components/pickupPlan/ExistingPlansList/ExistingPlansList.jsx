import Badge from '../../common/Badge/Badge.jsx'
import './ExistingPlansList.css'

const STATUS_TONE = {
  Scheduled: 'info',
  'In Progress': 'warning',
  Completed: 'success',
}

function ExistingPlansList({ plans }) {
  return (
    <div className="existing-plans">
      {plans.map((plan) => (
        <div key={plan.id} className="existing-plan-card">
          <div className="existing-plan-card__header">
            <h4>{plan.id}</h4>
            <Badge tone={STATUS_TONE[plan.status] || 'neutral'}>{plan.status}</Badge>
          </div>
          <p className="existing-plan-card__meta">📍 {plan.zone}</p>
          <p className="existing-plan-card__meta">
            {plan.reservationCount} reservations · {plan.totalQuantity} units
          </p>
          <p className="existing-plan-card__meta">🕐 {plan.window}</p>
          <button className="existing-plan-card__link">View Details →</button>
        </div>
      ))}
    </div>
  )
}

export default ExistingPlansList
