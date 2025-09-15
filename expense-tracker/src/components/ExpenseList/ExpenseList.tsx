// src/components/ExpenseList.tsx
import React from 'react';
// TODO: Import your Expense type

// TODO: Define ExpenseListProps interface
// What props does this component receive?

function ExpenseList(/* TODO: Add props with type */) {
  // TODO: Add type to the total calculation
  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount, 
    0
  );
  
  return (
    <div className="expense-list">
      <h2>Your Expenses</h2>
      <div className="total">
        Total: ${total.toFixed(2)}
      </div>
      
      {/* TODO: Add type to the expense parameter in map */}
      {expenses.map((expense) => (
        <div key={expense.id} className="expense-item">
          <div>
            <strong>{expense.description}</strong>
            <small>{expense.category} - {expense.date}</small>
          </div>
          <div>
            ${expense.amount.toFixed(2)}
            <button onClick={() => onDeleteExpense(expense.id)}>
              ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;