import Badge from '../../common/Badge/Badge.jsx'
import { getExpiryStatus } from '../../../utils/format.js'
import './ProduceDetailPanel.css'

function ProduceDetailPanel({ produce }) {
  const expiry = getExpiryStatus(produce.expiryAt)

  return (
    <div className="produce-detail-panel">
      <div className="produce-detail-panel__image">
        <Badge tone={expiry.tone}>{expiry.label}</Badge>
      </div>

      <h1 className="produce-detail-panel__name">{produce.name}</h1>
      <p className="produce-detail-panel__location">
        📍 {produce.seller.name} · {produce.location} · {produce.distanceKm} km away
      </p>

      <section className="produce-detail-panel__section">
        <h3>About this produce</h3>
        <p>{produce.description}</p>
      </section>

      <section className="produce-detail-panel__section">
        <h3>Harvest Information</h3>
        <p>{produce.harvestInfo}</p>
      </section>

      <section className="produce-detail-panel__section">
        <h3>Pickup Information</h3>
        <p>{produce.pickupInfo}</p>
      </section>
    </div>
  )
}

export default ProduceDetailPanel
