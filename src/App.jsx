import { useEffect, useState } from 'react'
// import './App.css'
import useExpense from './hooks/useExpense'
import useFilter from './hooks/useFilter'
import './styles/theme.css'
import './styles/global.css'
import './styles/components.css'
import { IoSunnySharp } from 'react-icons/io5'

import { BsMoonStarsFill } from 'react-icons/bs'
import useLocalStorage from './hooks/useLocalStorage'
function App() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [isDark, setIsDark] = useLocalStorage('dark', true)

  const { expenses, categories, addExpense, removeExpense, totalExpenses } =
    useExpense()

  const {
    filter,
    updateFilters,
    clearFilters,
    filteredData: filteredExpenses,
    getFilterSummary,
  } = useFilter(expenses)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!description.trim() || !amount || !category) {
      alert('Please fill in all fields')
      return
    }

    addExpense({
      description: description.trim(),
      amount: parseFloat(amount),
      category,
    })

    setDescription('')
    setAmount('')
    setCategory('')
  }

  const filterSummary = getFilterSummary()

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light',
    )
  }, [isDark])
  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  return (
    <div className='appContainer'>
      <div className='flex flex-row justify-between items-center gap-1.5'>
        <header className='header'>
          <h1 className='headerTitle'>Personal Expense Tracker </h1>

          <p className='text-muted'>
            Custom Hooks & LocalStorage Integration Track and manage your daily
            expenses efficiently
          </p>
        </header>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={toggleTheme}
        >
          {' '}
          {isDark ? (
            <BsMoonStarsFill size={'25px'} color='white' />
          ) : (
            <IoSunnySharp size={'25px'} color='bklack' />
          )}
        </button>
      </div>

      <section className='card'>
        <form className='form' action='' onSubmit={handleSubmit}>
          <div className='formRow'>
            <div className='formGroup'>
              <label htmlFor='description'>Description</label>

              <input
                className='input'
                id='description'
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Add Description'
                required
              />
            </div>

            <div className='formGroup'>
              <label htmlFor='amount'>Amount</label>

              <input
                className='input'
                id='amount'
                type='number'
                step={0.01}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Add Amount'
              />
            </div>

            <div className='formGroup'>
              <label htmlFor='category'>Category</label>

              <select
                className='input'
                onChange={(e) => setCategory(e.target.value)}
                name='category'
                id='category'
                value={category}
              >
                <option disabled value=''>
                  Select Category
                </option>

                {categories.slice(1).map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className='btn btn-primary' type='submit'>
            Submit
          </button>
        </form>
      </section>

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

      <section className='expensesGrid'>
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense) => {
            return (
              <div key={expense.id} className='card expenseCard'>
                <div className='expenseHeader'>
                  <h3>{expense.description}</h3>

                  <button
                    onClick={() => removeExpense(expense.id)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </div>

                <p className='expenseAmount'>₹{expense.amount.toFixed(2)}</p>

                <span className='categoryBadge'>{expense.category}</span>
              </div>
            )
          })
        ) : (
          <div className='card'>
            <p className='text-muted'>No expenses found</p>
          </div>
        )}
      </section>

      <section className='card totalCard'>
        <h3>Total Expenses</h3>

        <p className='totalValue'>₹{totalExpenses.toFixed(2)}</p>
      </section>
    </div>
  )
}

export default App
