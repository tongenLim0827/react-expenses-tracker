import { useState } from 'react';
import styles from './ExpenseForm.module.css';

export function ExpenseForm ({ onClose, onAddExpense }){
    const [expense, setExpense] = useState({
        name: '',
        description: '',
        category: '',
        amount: '',
        transDate: ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setExpense((prevExpense) => ({
            ...prevExpense,
            [name]: value,
        }));
    };

    function handleSubmit(event) {
        event.preventDefault();
        onAddExpense(expense);
        // console.log('New Expense: ', expense)
        alert('New expenses has been added!')
        onClose();
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>New Expense</h2>
            <form className={styles.ExpenseForm} onSubmit={handleSubmit}>
                <label>Expense Name:</label>
                <input type="text" name="name" value={expense.name} onChange={handleChange} required/>
                <br/>
                <label>Expense Description:</label>
                <input type="text" name="description" value={expense.description} onChange={handleChange} required/>
                <br/>
                <label>Category:</label>
                <select name="category" value={expense.category} onChange={handleChange} required>
                    <option value="">-- Select Category --</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Others">Others</option>
                </select>               
                <br/>
                <label>Amount:</label>
                <input type="number" name="amount" value={expense.amount} onChange={handleChange} required/>
                <br/>
                <label>Transaction Date:</label>
                <input type="date" name="transDate" value={expense.transDate} onChange={handleChange} required/>
                <br/>

                <div className={styles.BtnContainer}>
                    <button className={styles.ExpenseBtn} type="submit">Add</button>
                    <button className={styles.CancelBtn} type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
}