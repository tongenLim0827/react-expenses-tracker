import React, { useState } from "react";
import styles from "./ExpenseList.module.css";

export function ExpenseList({ expenses, onView, onDelete }) {
  const [sortOrder, setSortOrder] = useState({
    column: null,
    direction: "asc", 
  });

  const handleSort = (column) => {
    let newDirection = "asc";
    if (sortOrder.column === column && sortOrder.direction === "asc") {
      newDirection = "desc";
    }

    setSortOrder({
      column,
      direction: newDirection,
    });
  };

  const getSortedExpenses = () => {
    return [...expenses].sort((a, b) => {
        const aValue = a[sortOrder.column];
        const bValue = b[sortOrder.column];
        console.log("aValue: ", aValue, ", bValue: ", bValue);

        if (sortOrder.column === "amount") {
            const aAmount = parseFloat(aValue.replace("RM", "").trim());
            const bAmount = parseFloat(bValue.replace("RM", "").trim());
            return sortOrder.direction === "asc" ? aAmount - bAmount : bAmount - aAmount;
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
            return sortOrder.direction === "asc" ? aValue - bValue : bValue - aValue;
        }

        if (aValue instanceof Date && bValue instanceof Date) {
            return sortOrder.direction === "asc" ? aValue - bValue : bValue - aValue;
        }

        const aString = aValue.toString().toLowerCase();
        const bString = bValue.toString().toLowerCase();
        if (aString < bString) return sortOrder.direction === "asc" ? -1 : 1;
        if (aString > bString) return sortOrder.direction === "asc" ? 1 : -1;
        return 0;
    });
  };

  const sortedExpenses = sortOrder.column ? getSortedExpenses() : expenses; // Sort only if a column is selected

  return (
    <div className={styles.Container}>
      <table className={styles.TableStyle}>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name{" "}
              {sortOrder.column === "name" && (
                <span>{sortOrder.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("category")}>
              Category
              {sortOrder.column === "category" && (
                <span>{sortOrder.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("transDate")}>
              Transaction Date
              {sortOrder.column === "transDate" && (
                <span>{sortOrder.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("amount")}>
              Amount
              {sortOrder.column === "amount" && (
                <span>{sortOrder.direction === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th>Other Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.name}</td>
              <td className={styles[`Category${expense.category}`] || ""}>
                {expense.category}
              </td>
              <td>{expense.transDate}</td>
              <td>RM{expense.amount}</td>
              <td>
                <div className={styles.BtnContainer}>
                  <button className={styles.ViewBtn} onClick={() => onView(expense)}>
                    View
                  </button>
                  <button className={styles.DeleteBtn} onClick={() => onDelete(expense.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
