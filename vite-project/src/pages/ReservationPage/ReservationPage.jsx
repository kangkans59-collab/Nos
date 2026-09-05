import { useParams, Link, Navigate } from 'react-router-dom'
import PageContainer from '../../components/layout/PageContainer/PageContainer.jsx'
import ProduceDetailPanel from '../../components/reservation/ProduceDetailPanel/ProduceDetailPanel.jsx'
import ReservePanel from '../../components/reservation/ReservePanel/ReservePanel.jsx'
import { useApp } from '../../context/AppContext.jsx'
import './ReservationPage.css'

function ReservationPage() {
  const { produceId } = useParams()
  const { produce } = useApp()
  const item = produce.find((p) => p.id === produceId)

  if (!item) {
    return <Navigate to="/marketplace" replace />
  }

  return (
    <div className="reservation-page">
      <PageContainer>
        <Link to="/marketplace" className="reservation-page__back">
          ← Back to Marketplace
        </Link>
        <div className="reservation-page__grid">
          <ProduceDetailPanel produce={item} />
          <ReservePanel produce={item} />
        </div>
      </PageContainer>
    </div>
  )
}

export default ReservationPage
