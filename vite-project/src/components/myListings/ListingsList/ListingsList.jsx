import ListingCard from '../ListingCard/ListingCard.jsx'
import EmptyState from '../../common/EmptyState/EmptyState.jsx'
import './ListingsList.css'

function ListingsList({ listings, reservationsByProduce }) {
  if (listings.length === 0) {
    return <EmptyState title="No listings yet" message="Publish your first listing to see it here." />
  }

  return (
    <div className="listings-list">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} reservations={reservationsByProduce[listing.id] || []} />
      ))}
    </div>
  )
}

export default ListingsList
