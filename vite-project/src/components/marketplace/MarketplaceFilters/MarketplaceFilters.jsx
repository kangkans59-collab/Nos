import FormField from '../../common/FormField/FormField.jsx'
import Select from '../../common/Select/Select.jsx'
import Input from '../../common/Input/Input.jsx'
import { CATEGORY_OPTIONS } from '../../../data/constants.js'
import './MarketplaceFilters.css'

const SORT_OPTIONS = [
  { value: 'expiring', label: 'Expiring Soonest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'distance', label: 'Distance' },
]

function MarketplaceFilters({ category, onCategoryChange, sortBy, onSortChange, search, onSearchChange }) {
  return (
    <div className="marketplace-filters">
      <FormField label="Category" htmlFor="filter-category">
        <Select
          id="filter-category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          options={CATEGORY_OPTIONS}
          placeholder="All Produce"
        />
      </FormField>
      <FormField label="Sort By" htmlFor="filter-sort">
        <Select id="filter-sort" value={sortBy} onChange={(e) => onSortChange(e.target.value)} options={SORT_OPTIONS} />
      </FormField>
      <FormField label="Search" htmlFor="filter-search">
        <Input
          id="filter-search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search produce or seller"
        />
      </FormField>
    </div>
  )
}

export default MarketplaceFilters
