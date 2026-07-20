import useFilter from '../hooks/useFilter'

const Expenses = ({ expenses, setExpenses }) => {
  const { filteredData: filteredExpenses } = useFilter(expenses)

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id))
  }

  return (
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
  )
}

export default Expenses
