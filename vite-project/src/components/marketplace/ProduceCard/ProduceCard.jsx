import { useNavigate } from 'react-router-dom'
import Badge from '../../common/Badge/Badge.jsx'
import ProgressBar from '../../common/ProgressBar/ProgressBar.jsx'
import Button from '../../common/Button/Button.jsx'
import { formatCurrency, getExpiryStatus } from '../../../utils/format.js'
import './ProduceCard.css'

function ProduceCard({ produce }) {
  const navigate = useNavigate()
  const expiry = getExpiryStatus(produce.expiryAt)
  const isSoldOut = produce.status === 'sold-out' || produce.quantityAvailable <= 0

  return (
    <div className="produce-card">
      <div className="produce-card__image">
        <Badge tone={isSoldOut ? 'neutral' : expiry.tone}>{isSoldOut ? 'Sold Out' : expiry.label}</Badge>
      </div>
      <div className="produce-card__body">
        <h3 className="produce-card__name">{produce.name}</h3>
        <p className="produce-card__seller">
          📍 {produce.seller.name} · {produce.distanceKm} km away
        </p>
        <p className="produce-card__price">
          {formatCurrency(produce.pricePerUnit)}/{produce.unit}
        </p>
        <p className="produce-card__stock">
          {produce.quantityAvailable} {produce.unit} of {produce.quantityTotal} {produce.unit} left
        </p>
        <ProgressBar value={produce.quantityAvailable} max={produce.quantityTotal} />
        <Button fullWidth disabled={isSoldOut} onClick={() => navigate(`/reserve/${produce.id}`)}>
          {isSoldOut ? 'Sold Out' : 'Reserve'}
        </Button>
      </div>
    </div>
  )
}

export default ProduceCard
