import { useState } from 'react'
import Card from '../../common/Card/Card.jsx'
import FormField from '../../common/FormField/FormField.jsx'
import Input from '../../common/Input/Input.jsx'
import TextArea from '../../common/TextArea/TextArea.jsx'
import Button from '../../common/Button/Button.jsx'
import './NewPlanForm.css'

function NewPlanForm({ selectedReservations, onCreatePlan }) {
  const [location, setLocation] = useState('')
  const [window, setWindow] = useState('')
  const [notes, setNotes] = useState('')

  const totalQty = selectedReservations.reduce((sum, r) => sum + r.quantity, 0)
  const canCreate = selectedReservations.length > 0 && location.trim() && window.trim()

  function handleSubmit(e) {
    e.preventDefault()
    if (!canCreate) return
    onCreatePlan({ location: location.trim(), window: window.trim(), notes: notes.trim() })
    setLocation('')
    setWindow('')
    setNotes('')
  }

  return (
    <Card className="new-plan-form">
      <h3 className="new-plan-form__title">New Pickup Plan</h3>

      {selectedReservations.length > 0 ? (
        <div className="new-plan-form__summary">
          <p className="new-plan-form__summary-line">
            ✓ {selectedReservations.length} reservation{selectedReservations.length === 1 ? '' : 's'} selected
          </p>
          <ul className="new-plan-form__reservations">
            {selectedReservations.map((r) => (
              <li key={r.id}>
                <span>
                  {r.id} — {r.buyerName}
                </span>
                <span>
                  {r.quantity} {r.unit}
                </span>
              </li>
            ))}
          </ul>
          <div className="new-plan-form__totals">
            <span>Total Reservations: {selectedReservations.length}</span>
            <span>
              Total Qty: {totalQty} {selectedReservations[0]?.unit}
            </span>
          </div>
        </div>
      ) : (
        <p className="new-plan-form__empty">Select reservations from the list to build a pickup plan.</p>
      )}

      <form onSubmit={handleSubmit} className="new-plan-form__fields">
        <FormField label="Pickup Location" htmlFor="plan-location">
          <Input id="plan-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Sector 12 Community Hub" />
        </FormField>
        <FormField label="Scheduled Pickup Window" htmlFor="plan-window">
          <Input id="plan-window" value={window} onChange={(e) => setWindow(e.target.value)} placeholder="Today, 4:00 PM – 6:00 PM" />
        </FormField>
        <FormField label="Coordinator Notes" htmlFor="plan-notes">
          <TextArea
            id="plan-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Meet buyers near the north gate; sellers drop off by 3:45 PM."
            rows={3}
          />
        </FormField>
        <Button type="submit" fullWidth disabled={!canCreate}>
          Create Pickup Plan
        </Button>
      </form>
    </Card>
  )
}

export default NewPlanForm
