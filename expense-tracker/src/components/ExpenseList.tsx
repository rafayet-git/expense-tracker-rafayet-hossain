import type { Expense } from '../types/expense';

interface ExpenseListProps {
    expenses: Expense[];
    onDeleteExpense: (id: number) => void;
}

function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
    const total = expenses.reduce(
        (sum: number, expense: Expense) => sum + expense.amount,
        0
    );
    
    return (
        <>
        </>
    );
}

export default ExpenseList;