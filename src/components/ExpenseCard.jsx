import { useState } from 'react';
import styles from './ExpenseCard.module.css';

export function ExpenseCard({ expense, onClose, onEdit }) {
    const [editedExpense, setEditedExpense] = useState({ ...expense });

    function handleChange(event) {
        const { name, value } = event.target;
        setEditedExpense((prev) => ({ ...prev, [name]: value }));
    }

    function handleSave(event) {
        event.preventDefault();
        onEdit(editedExpense);
    }

    return (
        <div className={styles.ModalOverlay}>
            <div className={styles.ModalContent}>
                <h2 style={{ textAlign: 'center' }}>Edit Expense</h2>
                <form className={styles.ExpenseForm} onSubmit={handleSave}>
                    <label>Expense Name:</label>
                    <input type="text" name="name" value={editedExpense.name} onChange={handleChange} required/>
                    <br/>
                    <label>Expense Description:</label>
                    <input type="text" name="description" value={editedExpense.description} onChange={handleChange} required/>
                    <br/>
                    <label>Category:</label>
                    <select name="category" value={editedExpense.category} onChange={handleChange}required>
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
                    <input type="number" name="amount" value={editedExpense.amount} onChange={handleChange} required/>
                    <br/>
                    <label>Transaction Date:</label>
                    <input type="date" name="transDate" value={editedExpense.transDate} onChange={handleChange} required/>
                    <br/>
                    <div className={styles.BtnContainer}>
                        <button className={styles.ChangeBtn} type="submit">Save Changes</button>
                        <button className={styles.CloseBtn} type="button" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
