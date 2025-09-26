export type Category = string;

export interface Expense {
    id: number;
    amount: number;
    description: string;
    category: Category;
    date: string;
}
