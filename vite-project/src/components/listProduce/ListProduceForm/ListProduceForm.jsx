import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../../common/FormField/FormField.jsx'
import Input from '../../common/Input/Input.jsx'
import Select from '../../common/Select/Select.jsx'
import TextArea from '../../common/TextArea/TextArea.jsx'
import Button from '../../common/Button/Button.jsx'
import { CATEGORY_OPTIONS, UNIT_OPTIONS, CURRENT_SELLER } from '../../../data/constants.js'
import { useApp } from '../../../context/AppContext.jsx'
import './ListProduceForm.css'

const initialForm = {
  name: '',
  category: 'Vegetables',
  quantityTotal: '',
  unit: 'kg',
  pricePerUnit: '',
  location: CURRENT_SELLER.location,
  harvestDate: '',
  availableUntil: '',
  pickupInfo: '',
}

function ListProduceForm() {
  const { addProduce } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  function updateField(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const quantityTotal = Number(form.quantityTotal)
    const pricePerUnit = Number(form.pricePerUnit)

    if (!form.name.trim()) return setError('Please enter a produce name.')
    if (!quantityTotal || quantityTotal <= 0) return setError('Quantity must be greater than zero.')
    if (!pricePerUnit || pricePerUnit <= 0) return setError('Price must be greater than zero.')
    if (!form.availableUntil) return setError('Please set an available-until time.')

    setError('')

    addProduce({
      name: form.name.trim(),
      category: form.category,
      quantityTotal,
      unit: form.unit,
      pricePerUnit,
      location: form.location.trim() || CURRENT_SELLER.location,
      harvestInfo: form.harvestDate ? `Harvested ${form.harvestDate}` : 'Harvest date not specified',
      expiryAt: new Date(form.availableUntil).toISOString(),
      pickupInfo: form.pickupInfo.trim() || 'Pickup details to be confirmed with buyer.',
      description: `${form.name.trim()} — fresh surplus listed by ${CURRENT_SELLER.name}.`,
    })

    navigate('/my-listings')
  }

  return (
    <form className="list-produce-form" onSubmit={handleSubmit}>
      <FormField label="Produce Name" htmlFor="lp-name">
        <Input id="lp-name" value={form.name} onChange={updateField('name')} placeholder="e.g. Heirloom Tomatoes" />
      </FormField>

      <div className="list-produce-form__row">
        <FormField label="Category" htmlFor="lp-category">
          <Select id="lp-category" value={form.category} onChange={updateField('category')} options={CATEGORY_OPTIONS} />
        </FormField>
        <FormField label="Quantity Available" htmlFor="lp-quantity">
          <Input
            id="lp-quantity"
            type="number"
            min="0"
            value={form.quantityTotal}
            onChange={updateField('quantityTotal')}
            placeholder="50"
          />
        </FormField>
        <FormField label="Unit" htmlFor="lp-unit">
          <Select id="lp-unit" value={form.unit} onChange={updateField('unit')} options={UNIT_OPTIONS} />
        </FormField>
      </div>

      <div className="list-produce-form__row">
        <FormField label="Price per Unit (₹)" htmlFor="lp-price">
          <Input
            id="lp-price"
            type="number"
            min="0"
            value={form.pricePerUnit}
            onChange={updateField('pricePerUnit')}
            placeholder="18"
          />
        </FormField>
        <FormField label="Location" htmlFor="lp-location">
          <Input id="lp-location" value={form.location} onChange={updateField('location')} placeholder="Farm or pickup point" />
        </FormField>
      </div>

      <div className="list-produce-form__row">
        <FormField label="Harvest Date" htmlFor="lp-harvest" hint="When was this produce harvested?">
          <Input id="lp-harvest" type="date" value={form.harvestDate} onChange={updateField('harvestDate')} />
        </FormField>
        <FormField label="Available Until (Expiry)" htmlFor="lp-expiry">
          <Input id="lp-expiry" type="datetime-local" value={form.availableUntil} onChange={updateField('availableUntil')} />
        </FormField>
      </div>

      <FormField label="Pickup Information" htmlFor="lp-pickup" hint="Days, times, and any arrival notes">
        <TextArea
          id="lp-pickup"
          value={form.pickupInfo}
          onChange={updateField('pickupInfo')}
          placeholder="Days, times, and any arrival notes"
          rows={4}
        />
      </FormField>

      {error && <p className="list-produce-form__error">{error}</p>}

      <p className="list-produce-form__note">
        Buyers can reserve part or all of your available quantity — remaining stock updates automatically.
      </p>

      <Button type="submit" fullWidth>
        Publish Listing
      </Button>
    </form>
  )
}

export default ListProduceForm
