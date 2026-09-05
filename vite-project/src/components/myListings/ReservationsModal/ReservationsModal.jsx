import Modal from '../../common/Modal/Modal.jsx'
import EmptyState from '../../common/EmptyState/EmptyState.jsx'
import './ReservationsModal.css'

function ReservationsModal({ open, onClose, listingName, reservations }) {
  return (
    <Modal open={open} onClose={onClose} title={`Reservations — ${listingName}`}>
      {reservations.length === 0 ? (
        <EmptyState title="No reservations yet" message="This listing hasn't been reserved by any buyer." />
      ) : (
        <ul className="reservations-modal__list">
          {reservations.map((r) => (
            <li key={r.id} className="reservations-modal__item">
              <div>
                <p className="reservations-modal__buyer">{r.buyerName}</p>
                <p className="reservations-modal__id">{r.id}</p>
              </div>
              <p className="reservations-modal__quantity">
                {r.quantity} {r.unit}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  )
}

export default ReservationsModal
