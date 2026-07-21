import { useState } from 'react'

const AddExpenseForm = ({ categories, addExpense }) => {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!description.trim() || !amount || !category) {
      alert('Please fill in all fields')
      return
    }

    const newExpense = {
      description: description.trim(),
      amount: parseFloat(amount),
      category,
    }

    addExpense(newExpense)

    setDescription('')
    setAmount('')
    setCategory('')
  }
  return (
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
  )
}

export default AddExpenseForm
