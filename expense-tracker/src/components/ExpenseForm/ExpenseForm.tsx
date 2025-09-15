// src/components/ExpenseForm.tsx
import React, { useState } from 'react';
// TODO: Import FormEvent and ChangeEvent types from React
// TODO: Import your Expense and Category types

// TODO: Define ExpenseFormProps interface
// What props does this component receive?

function ExpenseForm(/* TODO: Add props with type */) {
  // TODO: Add types to all state variables
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('food');
  
  // TODO: Add parameter and return type
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: Create newExpense with proper type
    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      description,
      category,
      date: new Date().toLocaleDateString()
    };
    
    onAddExpense(newExpense);
    
    // Reset form
    setAmount('');
    setDescription('');
    setCategory('food');
  };
  
  // TODO: Add parameter and return type for change handlers
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  
  // Return JSX...
}