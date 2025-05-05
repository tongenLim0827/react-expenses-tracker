import styles from './App.module.css';
import { useState } from 'react';
import { ExpenseForm } from './components/ExpenseForm.jsx';
import { ExpenseList } from './components/ExpenseList.jsx';
import { ExpenseCard } from './components/ExpenseCard.jsx';
import { ExpenseFilter } from './components/ExpenseFilter.jsx';

function App() {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [expense, setExpense] = useState([]);
  const [viewExpense, setViewExpense] = useState(null);
  const categories = [
    'Food',
    'Transport',
    'Entertainment',
    'Grocery',
    'Utilities',
    'Others'
  ];
  const [filters, setFilter] = useState({
    month: "",
    year: "",
    category: [...categories]
  });


  function toggleWindow() {
    setIsWindowOpen(!isWindowOpen);
  }

  function addExpense(newExpense) {
    setExpense((prevExpense) => [
      ...prevExpense,
      { ...newExpense, id: Date.now() },
    ]);
  }

  function deleteExpense(expenseId) {
    setExpense((prevExpense) => prevExpense.filter((expense) => expense.id !== expenseId));
  }

  function calculateTotalSpending(expenses) {
    let total = 0;
    expenses.forEach((exp) => {
      total += parseFloat(exp.amount || 0);
    });
    return total.toFixed(2);
  }

  function handleViewExpense(expense) {
    setViewExpense(expense);
  }

  function closeViewWindow() {
    setViewExpense(null);
  }

  function handleEditExpense(updatedExpense) {
    setExpense((prevExpense) =>
      prevExpense.map((exp) =>
        exp.id === updatedExpense.id ? updatedExpense : exp
      )
    );
    closeViewWindow();
  }

  function handleFilter(key, value) {
    setFilter((prevFilters) => ({
      ...prevFilters,
        [key]: value,
    }));
  }

  const filteredExpenses = expense.filter(({ transDate, category }) => {
    const expenseDate = new Date(transDate);
    const selectedMonth = filters.month ? parseInt(filters.month, 10) : null;
    const selectedYear = filters.year ? parseInt(filters.year, 10) : null;

    return (
      (!selectedMonth || expenseDate.getMonth() + 1 === selectedMonth) &&
      (!selectedYear || expenseDate.getFullYear() === selectedYear) &&
      // if no category is selected then it matches all rows
      // if one or more categories are selected, then check if current category is in filters.category array
      (!filters.category.length === 0 || filters.category.includes(category))
    );
  });
  const totalTransactions = filteredExpenses.length;
  const totalSpending = calculateTotalSpending(filteredExpenses);

  return (
    <div className={styles.App}>
      <h1 className={styles.AppHeader}>Expensio.</h1>
      <div className={styles.Container}>
        <div className={styles.ExpenseDetail}>
          <h2>Total Spending: RM{totalSpending}</h2>
        </div>
        <div className={styles.ExpenseDetail}>
          <h2>Total Transactions: {totalTransactions}</h2>
        </div>
      </div>

      <div className={styles.AddBtnContainer}>
        <button className={styles.AddExpBtn} onClick={toggleWindow}>Add Expense</button>
      </div>
      
      {isWindowOpen && (
        <div className={styles.ModalOverlay}>
          <div className={styles.ModalContent}>
            <ExpenseForm
              onClose={toggleWindow}
              onAddExpense={addExpense}
            />
          </div>
        </div>
      )}
      <div className={styles.Container2}>
      <ExpenseFilter
          filters={filters}
          onFilter={handleFilter}
        />
        <ExpenseList
          expenses={filteredExpenses}
          onView={handleViewExpense}
          onDelete={deleteExpense}
        />
      </div>
      

      {viewExpense && (
        <ExpenseCard
          expense={viewExpense}
          onClose={closeViewWindow}
          onEdit={handleEditExpense}
        />
      )}
    </div>
  );
}

export default App;
