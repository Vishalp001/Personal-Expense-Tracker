import './styles/theme.css'
import './styles/global.css'
import './styles/components.css'
import Header from './components/Header'
import ToggleTheme from './components/ToggleTheme'
import AddExpenseForm from './components/AddExpenseForm'
import FilterSection from './components/FilterSection'
import TotalExpenses from './components/TotalExpenses'
import Expenses from './components/Expenses'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [expenses, setExpenses] = useLocalStorage('expenses', [])
  return (
    <div className='appContainer'>
      <div className='flex flex-row justify-between items-center gap-1.5'>
        <Header />
        <ToggleTheme />
      </div>
      <AddExpenseForm expenses={expenses} setExpenses={setExpenses} />

      <FilterSection expenses={expenses} />

      <Expenses expenses={expenses} setExpenses={setExpenses} />

      <TotalExpenses expenses={expenses} />
    </div>
  )
}

export default App
