import Badge from '../../common/Badge/Badge.jsx'
import EmptyState from '../../common/EmptyState/EmptyState.jsx'
import './UngroupedReservationsList.css'

function UngroupedReservationsList({ reservations, selectedIds, onToggle }) {
  if (reservations.length === 0) {
    return <EmptyState title="Nothing to group" message="All reservations are already scheduled for pickup." />
  }

  return (
    <div className="ungrouped-list">
      {reservations.map((r) => {
        const selected = selectedIds.includes(r.id)
        return (
          <label key={r.id} className={`ungrouped-item ${selected ? 'ungrouped-item--selected' : ''}`}>
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onToggle(r.id)}
              className="ungrouped-item__checkbox"
            />
            <div className="ungrouped-item__details">
              <p className="ungrouped-item__id">{r.id}</p>
              <p className="ungrouped-item__meta">
                Buyer: {r.buyerName} · Seller: {r.sellerName}
              </p>
              <p className="ungrouped-item__meta">
                📍 {r.zone} · 🕐 {r.pickupWindow}
              </p>
            </div>
            <div className="ungrouped-item__side">
              <span className="ungrouped-item__quantity">
                {r.quantity} {r.unit}
              </span>
              <Badge tone="warning">Ready for Pickup</Badge>
            </div>
          </label>
        )
      })}
    </div>
  )
}

export default UngroupedReservationsList
