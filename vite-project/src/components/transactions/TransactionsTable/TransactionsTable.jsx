import { formatCurrency, formatDateTime } from '../../../utils/format.js'
import './TransactionsTable.css'

function TransactionsTable({ transactions }) {
  return (
    <div className="transactions-table-wrapper">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Produce</th>
            <th>Qty</th>
            <th>Price/Unit</th>
            <th>Subtotal</th>
            <th>Buyer</th>
            <th>Seller</th>
            <th>Pickup Location</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.produceName}</td>
              <td>
                {t.quantity} {t.unit}
              </td>
              <td>{formatCurrency(t.pricePerUnit)}</td>
              <td>{formatCurrency(t.quantity * t.pricePerUnit)}</td>
              <td>{t.buyer}</td>
              <td>{t.seller}</td>
              <td>{t.pickupLocation}</td>
              <td>{formatDateTime(t.completedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionsTable
