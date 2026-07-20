const TotalExpenses = ({ expenses }) => {
  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0)

  return (
    <section className='card totalCard'>
      <h3>Total Expenses</h3>

      <p className='totalValue'>₹{total}</p>
    </section>
  )
}

export default TotalExpenses
