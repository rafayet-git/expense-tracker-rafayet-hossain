import { useState } from 'react';
// TODO: Import your Expense type
// import ExpenseForm from './components/ExpenseForm';
// import ExpenseList from './components/ExpenseList';

function App() {
  // TODO: Add type to the useState for expenses array
  // Hint: useState<Type[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // TODO: Add parameter and return types to addExpense
  const addExpense = (expense: Expense): void => {
    setExpenses([...expenses, expense]);
  };
  
  // TODO: Add parameter and return types to deleteExpense
  const deleteExpense = (id: number): void => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };
  
  return (
    <div className="App">
      <h1>💰 Expense Tracker</h1>
      <ExpenseForm onAddExpense={addExpense} />
      <ExpenseList 
        expenses={expenses} 
        onDeleteExpense={deleteExpense} 
      />
    </div>
  );
}

export default App;