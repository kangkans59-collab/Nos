import { useMemo } from 'react'
import PageContainer from '../../components/layout/PageContainer/PageContainer.jsx'
import PageHeader from '../../components/layout/PageHeader/PageHeader.jsx'
import ListingsList from '../../components/myListings/ListingsList/ListingsList.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { CURRENT_SELLER } from '../../data/constants.js'
import './MyListingsPage.css'

function MyListingsPage() {
  const { produce, reservations } = useApp()

  const myListings = useMemo(() => produce.filter((item) => item.seller.id === CURRENT_SELLER.id), [produce])

  const reservationsByProduce = useMemo(() => {
    return reservations.reduce((acc, r) => {
      acc[r.produceId] = acc[r.produceId] ? [...acc[r.produceId], r] : [r]
      return acc
    }, {})
  }, [reservations])

  return (
    <div className="my-listings-page">
      <PageContainer>
        <PageHeader title="My Surplus Listings" />
        <ListingsList listings={myListings} reservationsByProduce={reservationsByProduce} />
      </PageContainer>
    </div>
  )
}

export default MyListingsPage
