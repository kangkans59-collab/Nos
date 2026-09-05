import { useState } from 'react'
import Card from '../../common/Card/Card.jsx'
import ProgressBar from '../../common/ProgressBar/ProgressBar.jsx'
import QuantityStepper from '../../common/QuantityStepper/QuantityStepper.jsx'
import Button from '../../common/Button/Button.jsx'
import { formatCurrency } from '../../../utils/format.js'
import { useApp } from '../../../context/AppContext.jsx'
import './ReservePanel.css'

// `produce` is the live item from AppContext (re-read from state by the
// parent page), so after a reservation is confirmed this panel re-renders
// with the freshly reduced `quantityAvailable` — no page reload needed.
function ReservePanel({ produce }) {
  const { reserveProduce } = useApp()
  const [quantity, setQuantity] = useState(produce.quantityAvailable > 0 ? 1 : 0)
  const [confirmed, setConfirmed] = useState(null)

  const isSoldOut = produce.quantityAvailable <= 0
  const subtotal = quantity * produce.pricePerUnit

  function handleReserve() {
    // Guard against over-reservation even though the stepper already caps
    // the value at quantityAvailable.
    if (isSoldOut || quantity <= 0 || quantity > produce.quantityAvailable) return
    reserveProduce(produce.id, quantity)
    setConfirmed({ quantity })
    setQuantity(1)
  }

  return (
    <Card className="reserve-panel">
      <h3 className="reserve-panel__title">Reserve This Produce</h3>
      <p className="reserve-panel__price">
        {formatCurrency(produce.pricePerUnit)} / {produce.unit}
      </p>
      <p className="reserve-panel__stock">
        {produce.quantityAvailable} {produce.unit} of {produce.quantityTotal} {produce.unit} still available
      </p>
      <ProgressBar value={produce.quantityAvailable} max={produce.quantityTotal} />

      {isSoldOut ? (
        <p className="reserve-panel__sold-out">This listing is fully reserved.</p>
      ) : (
        <>
          <div className="reserve-panel__quantity">
            <span>How much would you like to reserve?</span>
            <QuantityStepper value={quantity} min={1} max={produce.quantityAvailable} onChange={setQuantity} />
            <p className="reserve-panel__hint">
              You can reserve up to {produce.quantityAvailable} {produce.unit} (the remaining stock).
            </p>
          </div>

          <div className="reserve-panel__subtotal">
            <span>
              Subtotal ({quantity} {produce.unit} × {formatCurrency(produce.pricePerUnit)})
            </span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>

          <Button fullWidth onClick={handleReserve} disabled={quantity <= 0}>
            Reserve Now
          </Button>
          <p className="reserve-panel__note">Your reservation holds this quantity while you arrange pickup.</p>
        </>
      )}

      {confirmed && (
        <p className="reserve-panel__confirmation">
          ✓ Reserved {confirmed.quantity} {produce.unit}. Remaining stock has been updated.
        </p>
      )}
    </Card>
  )
}

export default ReservePanel
