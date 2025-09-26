
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import type { Expense, Category } from '../types/expense';

interface ExpenseFormProps {
    onAddExpense: (expense: Expense) => void;
}

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
    const [amount, setAmount] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<Category>('');
    
    // Suggested categories for better UX
    const suggestedCategories = ['food', 'transport', 'utilities', 'entertainment', 'other'];
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        
        const newExpense: Expense = {
            id: Date.now(),
            amount: parseFloat(amount),
            description,
            category: category.toLowerCase().trim(),
            date: new Date().toLocaleDateString()
        };
        
        onAddExpense(newExpense);
        
        // Reset form
        setAmount('');
        setDescription('');
        setCategory('');
    };
    
    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setAmount(e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setDescription(e.target.value);
    };

    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setCategory(e.target.value);
    };
  
    return (
        <>
        
        </>
    );
}