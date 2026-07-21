import './styles/theme.css'
import './styles/global.css'
import './styles/components.css'
import Header from './components/Header'
import ToggleTheme from './components/ToggleTheme'
import AddExpenseForm from './components/AddExpenseForm'
import FilterSection from './components/FilterSection'
import TotalExpenses from './components/TotalExpenses'
import Expenses from './components/Expenses'
import useExpense from './hooks/useExpense'
import useFilter from './hooks/useFilter'

function App() {
  const { expenses, setExpenses, categories, addExpense } = useExpense()
  const {
    filter,
    updateFilters,
    filteredData,
    clearFilters,
    getFilterSummary,
  } = useFilter(expenses)
  return (
    <div className='appContainer'>
      <div className='flex flex-row justify-between items-center gap-1.5'>
        <Header />
        <ToggleTheme />
      </div>
      <AddExpenseForm categories={categories} addExpense={addExpense} />

      <FilterSection
        filter={filter}
        updateFilters={updateFilters}
        clearFilters={clearFilters}
        getFilterSummary={getFilterSummary}
        expenses={expenses}
        categories={categories}
      />

      <Expenses expenses={filteredData} setExpenses={setExpenses} />

      <TotalExpenses expenses={expenses} />
    </div>
  )
}

export default App
