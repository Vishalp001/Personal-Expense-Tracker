import { useMemo, useState } from 'react'

const useFilter = (data) => {
  const [filter, setFilter] = useState({
    category: 'all',
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: '',
    searchTerm: '',
  })

  const updateFilters = (key, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setFilter({
      category: 'all',
      dateFrom: '',
      dateTo: '',
      minAmount: '',
      maxAmount: '',
      searchTerm: '',
    })
  }

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Category Filter
      if (filter.category !== 'all' && item.category !== filter.category) {
        return false
      }
      // Date range filter
      if (filter.dateFrom && item.date < filter.dateFrom) {
        return false
      }
      if (filter.dateTo && item.date > filter.dateTo) {
        return false
      }
      // Amount Filter
      if (filter.minAmount && item.amount < parseFloat(filter.minAmount)) {
        return false
      }
      if (filter.maxAmount && item.amount > parseFloat(filter.maxAmount)) {
        return false
      }
      // Search Term
      if (
        filter.searchTerm &&
        !item.description
          .toLowerCase()
          .includes(filter.searchTerm.toLowerCase())
      ) {
        return false
      }

      return true
    })
  }, [data, filter])

  const getFilterSummary = () => {
    const activeFilters = Object.entries(filter).filter(([key, value]) => {
      if (key === 'category') return value !== 'all'

      return String(value).trim() !== ''
    })

    return {
      activeCount: activeFilters.length,
      totalResult: filteredData.length,
      hasActiveFilter: activeFilters.length > 0,
    }
  }

  return {
    filter,
    updateFilters,
    clearFilters,
    filteredData,
    getFilterSummary,
  }
}

export default useFilter
