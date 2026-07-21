import { useMemo } from 'react'
import useLocalStorage from './useLocalStorage'

const categories = [
  'all',
  'Food',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Other',
]

const useExpense = () => {
  const [expenses, setExpenses] = useLocalStorage('expenses', [])

  const addExpense = (expenseData) => {
    const newExpense = {
      id: Date.now(),
      ...expenseData,
      date: new Date().toISOString().split('T')[0],
    }
    setExpenses((prevExp) => {
      console.log('Prev:', prevExp)
      return [newExpense, ...prevExp]
    })
  }

  const removeExpense = (id) => {
    setExpenses((prevExp) => prevExp.filter((exp) => exp.id !== id))
  }

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  }, [expenses])

  const getExpensesByCategory = (category) => {
    if (!category || category === 'all') return expenses

    return expenses.filter((expense) => expense.category === category)
  }

  return {
    expenses,
    categories,
    addExpense,
    removeExpense,
    totalExpenses,
    setExpenses,
    getExpensesByCategory,
  }
}

export default useExpense
