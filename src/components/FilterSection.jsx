const FilterSection = ({
  expenses,
  categories,
  filter,
  updateFilters,
  clearFilters,
  getFilterSummary,
}) => {
  const filterSummary = getFilterSummary()

  return (
    <section className='card filterPanel mt-lg'>
      <div className='formRow'>
        <div className='formGroup'>
          <label htmlFor='filterCategory'>Get By Category</label>

          <select
            className='input'
            onChange={(e) => updateFilters('category', e.target.value)}
            name='filterCategory'
            id='filterCategory'
            value={filter.category}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All' : category}
              </option>
            ))}
          </select>
        </div>

        <div className='formGroup'>
          <label htmlFor='searchExpense'>Search Description</label>

          <input
            className='input'
            id='searchExpense'
            type='text'
            placeholder='Search Expenses...'
            value={filter.searchTerm}
            onChange={(e) => updateFilters('searchTerm', e.target.value)}
          />
        </div>

        <div className='formGroup'>
          <label htmlFor='minAmount'>Min Amount</label>

          <input
            className='input'
            id='minAmount'
            type='number'
            step='0.01'
            placeholder='0.00'
            value={filter.minAmount}
            onChange={(e) => updateFilters('minAmount', e.target.value)}
          />
        </div>

        <div className='formGroup'>
          <label htmlFor='maxAmount'>Max Amount</label>

          <input
            className='input'
            id='maxAmount'
            type='number'
            step='0.01'
            placeholder='999.99'
            value={filter.maxAmount}
            onChange={(e) => updateFilters('maxAmount', e.target.value)}
          />
        </div>

        <div className='formGroup'>
          <label htmlFor='dateFrom'>Date From</label>

          <input
            className='input'
            id='dateFrom'
            type='date'
            max={filter.dateTo || undefined}
            value={filter.dateFrom}
            onChange={(e) => updateFilters('dateFrom', e.target.value)}
          />
        </div>

        <div className='formGroup'>
          <label htmlFor='dateTo'>Date To</label>

          <input
            className='input'
            id='dateTo'
            min={filter.dateFrom || undefined}
            type='date'
            value={filter.dateTo}
            onChange={(e) => updateFilters('dateTo', e.target.value)}
          />
        </div>
      </div>

      <div className='flex items-center justify-between mt-lg'>
        {filterSummary.hasActiveFilter && (
          <button
            className='btn btn-secondary'
            type='button'
            onClick={clearFilters}
          >
            Clear Filter ({filterSummary.activeCount})
          </button>
        )}

        <p className='text-muted'>
          Showing {filterSummary.totalResult} of {expenses.length} expenses.
          {filterSummary.hasActiveFilter &&
            ` (${filterSummary.activeCount} filter${
              filterSummary.activeCount !== 1 ? 's' : ''
            } active)`}
        </p>
      </div>
    </section>
  )
}

export default FilterSection
