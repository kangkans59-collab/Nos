import { useMemo, useState } from 'react'
import PageContainer from '../../components/layout/PageContainer/PageContainer.jsx'
import PageHeader from '../../components/layout/PageHeader/PageHeader.jsx'
import UngroupedReservationsList from '../../components/pickupPlan/UngroupedReservationsList/UngroupedReservationsList.jsx'
import NewPlanForm from '../../components/pickupPlan/NewPlanForm/NewPlanForm.jsx'
import ExistingPlansList from '../../components/pickupPlan/ExistingPlansList/ExistingPlansList.jsx'
import { useApp } from '../../context/AppContext.jsx'
import './GroupPickupPlanPage.css'

function GroupPickupPlanPage() {
  const { reservations, pickupPlans, createPickupPlan } = useApp()
  const [selectedIds, setSelectedIds] = useState([])

  const ungrouped = useMemo(() => reservations.filter((r) => r.status === 'ready-for-pickup'), [reservations])

  const selectedReservations = useMemo(
    () => ungrouped.filter((r) => selectedIds.includes(r.id)),
    [ungrouped, selectedIds]
  )

  function toggleReservation(id) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function handleCreatePlan({ location, window, notes }) {
    createPickupPlan({ reservationIds: selectedIds, location, window, notes })
    setSelectedIds([])
  }

  return (
    <div className="group-pickup-plan-page">
      <PageContainer>
        <PageHeader
          title="Group Pickup Planner"
          subtitle="Cluster nearby reservations awaiting pickup into a single coordinated run."
        />

        <div className="group-pickup-plan-page__grid">
          <section>
            <h3 className="group-pickup-plan-page__section-title">
              Ready for Pickup — Ungrouped ({ungrouped.length})
            </h3>
            <UngroupedReservationsList reservations={ungrouped} selectedIds={selectedIds} onToggle={toggleReservation} />
          </section>

          <NewPlanForm selectedReservations={selectedReservations} onCreatePlan={handleCreatePlan} />
        </div>

        <section className="group-pickup-plan-page__existing">
          <h3 className="group-pickup-plan-page__section-title">Existing Pickup Plans</h3>
          <ExistingPlansList plans={pickupPlans} />
        </section>
      </PageContainer>
    </div>
  )
}

export default GroupPickupPlanPage
