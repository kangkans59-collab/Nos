import ProduceCard from '../ProduceCard/ProduceCard.jsx'
import EmptyState from '../../common/EmptyState/EmptyState.jsx'
import './ProduceGrid.css'

function ProduceGrid({ produce }) {
  if (produce.length === 0) {
    return <EmptyState title="No produce found" message="Try adjusting your filters or search." />
  }

  return (
    <div className="produce-grid">
      {produce.map((item) => (
        <ProduceCard key={item.id} produce={item} />
      ))}
    </div>
  )
}

export default ProduceGrid
