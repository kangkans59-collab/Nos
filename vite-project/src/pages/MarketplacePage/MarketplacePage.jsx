import { useMemo, useState } from 'react'
import PageContainer from '../../components/layout/PageContainer/PageContainer.jsx'
import PageHeader from '../../components/layout/PageHeader/PageHeader.jsx'
import MarketplaceFilters from '../../components/marketplace/MarketplaceFilters/MarketplaceFilters.jsx'
import ProduceGrid from '../../components/marketplace/ProduceGrid/ProduceGrid.jsx'
import { useApp } from '../../context/AppContext.jsx'
import './MarketplacePage.css'

function MarketplacePage() {
  const { produce } = useApp()
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('expiring')
  const [search, setSearch] = useState('')

  const visibleProduce = useMemo(() => {
    let list = [...produce]

    if (category) {
      list = list.filter((item) => item.category === category)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(
        (item) => item.name.toLowerCase().includes(q) || item.seller.name.toLowerCase().includes(q)
      )
    }

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.pricePerUnit - b.pricePerUnit)
        break
      case 'price-desc':
        list.sort((a, b) => b.pricePerUnit - a.pricePerUnit)
        break
      case 'distance':
        list.sort((a, b) => a.distanceKm - b.distanceKm)
        break
      case 'expiring':
      default:
        list.sort((a, b) => new Date(a.expiryAt) - new Date(b.expiryAt))
        break
    }

    return list
  }, [produce, category, sortBy, search])

  return (
    <div className="marketplace-page">
      <PageContainer>
        <PageHeader
          title="Surplus Near You"
          subtitle="Fresh surplus from local sellers, sorted by what's expiring soonest."
        />
        <MarketplaceFilters
          category={category}
          onCategoryChange={setCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          search={search}
          onSearchChange={setSearch}
        />
        <ProduceGrid produce={visibleProduce} />
      </PageContainer>
    </div>
  )
}

export default MarketplacePage
