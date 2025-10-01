export interface Expense {
    id: number;
    amount: number;
    category: string;
    date: string; // iso format
    description: string;
    recurring?: {
        isRecurring: boolean;
        frequency: number;
        interval: 'day' | 'week' | 'month' | 'year';
    }
}
