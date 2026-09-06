
import { useState } from 'react'
import Card from '../../common/Card/Card.jsx'
import FormField from '../../common/FormField/FormField.jsx'
import Input from '../../common/Input/Input.jsx'
import Select from '../../common/Select/Select.jsx'
import Button from '../../common/Button/Button.jsx'
import { UNIT_OPTIONS } from '../../../data/constants.js'
import './LogTransactionForm.css'

function LogTransactionForm({ sellerName, onLogTransaction }) {
  const [produceName, setProduceName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('')
  const [pricePerUnit, setPricePerUnit] = useState('')
  const [buyer, setBuyer] = useState('')
  const [pickupLocation, setPickupLocation] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const canSubmit =
    produceName.trim() &&
    Number(quantity) > 0 &&
    unit &&
    Number(pricePerUnit) >= 0 &&
    buyer.trim() &&
    pickupLocation.trim()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit || submitting) return

    setSubmitting(true)
    try {
      await onLogTransaction({
        produceName: produceName.trim(),
        quantity: Number(quantity),
        unit,
        pricePerUnit: Number(pricePerUnit),
        seller: sellerName,
        buyer: buyer.trim(),
        pickupLocation: pickupLocation.trim(),
      })
      setProduceName('')
      setQuantity('')
      setUnit('')
      setPricePerUnit('')
      setBuyer('')
      setPickupLocation('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="log-transaction-form">
      <h3 className="log-transaction-form__title">Record a Completed Sale</h3>
      <p className="log-transaction-form__hint">
        Logged as {sellerName}. Once saved, buyers can see this in Transaction History and it's
        included in the CSV export — buyers cannot edit it.
      </p>

      <form onSubmit={handleSubmit} className="log-transaction-form__fields">
        <FormField label="Produce" htmlFor="txn-produce">
          <Input
            id="txn-produce"
            value={produceName}
            onChange={(e) => setProduceName(e.target.value)}
            placeholder="Heirloom Tomatoes"
          />
        </FormField>

        <div className="log-transaction-form__row">
          <FormField label="Quantity" htmlFor="txn-quantity">
            <Input
              id="txn-quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="12"
            />
          </FormField>
          <FormField label="Unit" htmlFor="txn-unit">
            <Select
              id="txn-unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              options={UNIT_OPTIONS}
              placeholder="Select unit"
            />
          </FormField>
        </div>

        <FormField label="Price Per Unit" htmlFor="txn-price">
          <Input
            id="txn-price"
            type="number"
            min="0"
            step="0.01"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            placeholder="18"
          />
        </FormField>

        <FormField label="Buyer Name" htmlFor="txn-buyer">
          <Input
            id="txn-buyer"
            value={buyer}
            onChange={(e) => setBuyer(e.target.value)}
            placeholder="Ramesh K."
          />
        </FormField>

        <FormField label="Pickup Location" htmlFor="txn-location">
          <Input
            id="txn-location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            placeholder="Sector 12 Community Hub"
          />
        </FormField>

        <Button type="submit" fullWidth disabled={!canSubmit || submitting}>
          {submitting ? 'Saving…' : 'Save Transaction'}
        </Button>
      </form>
    </Card>
  )
}

export default LogTransactionForm
