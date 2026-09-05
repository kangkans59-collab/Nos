import { useState } from 'react'
import Badge from '../../common/Badge/Badge.jsx'
import ProgressBar from '../../common/ProgressBar/ProgressBar.jsx'
import ReservationsModal from '../ReservationsModal/ReservationsModal.jsx'
import { formatCurrency, getExpiryStatus } from '../../../utils/format.js'
import './ListingCard.css'

function ListingCard({ listing, reservations }) {
  const [modalOpen, setModalOpen] = useState(false)
  const expiry = getExpiryStatus(listing.expiryAt)
  const isSoldOut = listing.status === 'sold-out' || listing.quantityAvailable <= 0

  return (
    <div className="listing-card">
      <div className="listing-card__main">
        <h3 className="listing-card__name">{listing.name}</h3>
        <p className="listing-card__meta">
          {formatCurrency(listing.pricePerUnit)}/{listing.unit} · {reservations.length} reservation
          {reservations.length === 1 ? '' : 's'} · {listing.quantityReserved} {listing.unit} reserved
        </p>
        <p className="listing-card__stock">
          {listing.quantityAvailable} {listing.unit} of {listing.quantityTotal} {listing.unit} remaining
        </p>
        <ProgressBar value={listing.quantityAvailable} max={listing.quantityTotal} />
      </div>

      <div className="listing-card__side">
        <Badge tone={isSoldOut ? 'info' : 'success'}>{isSoldOut ? 'Sold Out' : 'Active'}</Badge>
        <Badge tone={isSoldOut ? 'neutral' : expiry.tone}>{expiry.label}</Badge>
        <button className="listing-card__link" onClick={() => setModalOpen(true)}>
          View Reservations →
        </button>
      </div>

      <ReservationsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        listingName={listing.name}
        reservations={reservations}
      />
    </div>
  )
}

export default ListingCard
