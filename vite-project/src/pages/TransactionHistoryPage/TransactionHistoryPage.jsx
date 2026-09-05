import PageContainer from '../../components/layout/PageContainer/PageContainer.jsx'
import PageHeader from '../../components/layout/PageHeader/PageHeader.jsx'
import TransactionsTable from '../../components/transactions/TransactionsTable/TransactionsTable.jsx'
import DownloadCsvButton from '../../components/transactions/DownloadCsvButton/DownloadCsvButton.jsx'
import { useApp } from '../../context/AppContext.jsx'
import './TransactionHistoryPage.css'

const CSV_COLUMNS = [
  { label: 'Transaction ID', accessor: (t) => t.id },
  { label: 'Produce', accessor: (t) => t.produceName },
  { label: 'Quantity', accessor: (t) => t.quantity },
  { label: 'Unit', accessor: (t) => t.unit },
  { label: 'Price Per Unit', accessor: (t) => t.pricePerUnit },
  { label: 'Subtotal', accessor: (t) => t.quantity * t.pricePerUnit },
  { label: 'Buyer', accessor: (t) => t.buyer },
  { label: 'Seller', accessor: (t) => t.seller },
  { label: 'Pickup Location', accessor: (t) => t.pickupLocation },
  { label: 'Completed At', accessor: (t) => t.completedAt },
]

function TransactionHistoryPage() {
  const { transactions } = useApp()

  return (
    <div className="transaction-history-page">
      <PageContainer>
        <PageHeader
          title="Transaction History"
          subtitle="Completed reservations and pickups."
          action={<DownloadCsvButton rows={transactions} columns={CSV_COLUMNS} filename="farmshare-transactions.csv" />}
        />
        <TransactionsTable transactions={transactions} />
      </PageContainer>
    </div>
  )
}

export default TransactionHistoryPage
