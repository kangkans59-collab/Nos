import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import PageContainer from '../../components/layout/PageContainer/PageContainer.jsx'
import PageHeader from '../../components/layout/PageHeader/PageHeader.jsx'
import Badge from '../../components/common/Badge/Badge.jsx'
import EmptyState from '../../components/common/EmptyState/EmptyState.jsx'
import Button from '../../components/common/Button/Button.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { CURRENT_BUYER } from '../../data/constants.js'
import './CartPage.css'

const STATUS_TONE = {
  'ready-for-pickup': 'warning',
  grouped: 'info',
  completed: 'success',
}

const STATUS_LABEL = {
  'ready-for-pickup': 'Ready for Pickup',
  grouped: 'Pickup Scheduled',
  completed: 'Completed',
}

// The buyer-facing "Cart" is simply the reservations this buyer currently
// has open — everything they've reserved from the marketplace that hasn't
// been completed yet.
function CartPage() {
  const { reservations } = useApp()

  const myReservations = useMemo(
    () => reservations.filter((r) => r.buyerName === CURRENT_BUYER.name),
    [reservations]
  )

  return (
    <div className="cart-page">
      <PageContainer>
        <PageHeader title="My Cart" subtitle="Produce you've reserved, waiting to be picked up." />

        {myReservations.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            message="Reserve produce from the marketplace to see it here."
            action={
              <Link to="/marketplace">
                <Button>Browse Marketplace</Button>
              </Link>
            }
          />
        ) : (
          <div className="cart-page__list">
            {myReservations.map((r) => (
              <div key={r.id} className="cart-item">
                <div className="cart-item__main">
                  <h3 className="cart-item__name">{r.produceName}</h3>
                  <p className="cart-item__meta">
                    {r.quantity} {r.unit} · from {r.sellerName}
                  </p>
                  <p className="cart-item__zone">{r.zone}</p>
                </div>

                <div className="cart-item__side">
                  <Badge tone={STATUS_TONE[r.status] || 'neutral'}>{STATUS_LABEL[r.status] || r.status}</Badge>
                  <p className="cart-item__window">{r.pickupWindow}</p>
                  <p className="cart-item__id">{r.id}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </PageContainer>
    </div>
  )
}

export default CartPage