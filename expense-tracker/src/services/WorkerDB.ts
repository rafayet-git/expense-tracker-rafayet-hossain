import { sqlite3Worker1Promiser } from '@sqlite.org/sqlite-wasm';
import type { Expense, Category } from '../types/expense';

type PromiserFn = (type: string, args?: any) => Promise<{ type: string; result: any }>; 

let dbPromise: Promise<PromiserFn> | null = null;
let dbId: string | null = null;

async function openInit(promiser: PromiserFn) {
	let openResp;
	try {
		openResp = await promiser('open', { filename: 'file:expenses.db?vfs=opfs' });
	} catch (error) {
		console.warn('Not able to init OPFS:', error);
		openResp = await promiser('open', { filename: 'file:expenses.db?vfs=kvvfs' }); // IndexedDB
	}
	dbId = openResp.result.dbId;

	await promiser('exec', { dbId, 
		sql: `
		CREATE TABLE IF NOT EXISTS categories (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT UNIQUE NOT NULL
		);
		CREATE TABLE IF NOT EXISTS expenses (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			amount REAL NOT NULL,
			category_id INTEGER NOT NULL,
			date TEXT NOT NULL,
			description TEXT NOT NULL,
			recurring_is_recurring INTEGER DEFAULT 0,
			recurring_frequency INTEGER,
			recurring_interval TEXT,
			FOREIGN KEY (category_id) REFERENCES categories (id)
		);
	` });

	// Default categories
	const categories = [
		'Food & Dining',
		'Transportation',
		'Shopping',
		'Bills & Utilities',
		'Subscriptions',
		'Other'
	];
	const catPlaceholder = categories.map(() => '(?)').join(', ');
	await promiser('exec', { dbId,
		sql: `INSERT OR IGNORE INTO categories (name) VALUES ${catPlaceholder};`,
		bind: categories
	});
	console.log('Storage initialized');
}

async function ensurePromiser(): Promise<PromiserFn> {
	if (dbPromise) return dbPromise;
	dbPromise = (async () => {
		const anyProm: any = sqlite3Worker1Promiser; // unsafe? way of calling promiser.v2
		const promiser: PromiserFn = anyProm?.v2
			? await anyProm.v2({ debug: (...a: any[]) => console.debug('[sqlite-worker]', ...a) }) //anyProm.v2()
			: await new Promise<PromiserFn>((resolve) => {
					const inst = anyProm({ onready: (_: any) => resolve(_ as PromiserFn) });
					void inst;
				});
		await openInit(promiser);
		return promiser;
	})();
	return dbPromise;
}

export async function initDB(): Promise<boolean> {
	try {
		await ensurePromiser();
		return true;
	} catch (error) {
		console.error('Worker failed:', error);
		return false;
	}
}

export async function getAllCategories(): Promise<Category[]> {
	try {
		const promise = await ensurePromiser();
		const msg = await promise('exec', { dbId, 
			sql: 'SELECT * FROM categories ORDER BY id ASC',
			rowMode: 'object',
			resultRows: []
		});
		return (msg.result?.resultRows ?? []) as Category[];
	} catch (error) { 
		console.error('Failed: ', error);
		return [];
	}
}

export async function getCategory(id: number): Promise<Category | null> {
	try {
		const promise = await ensurePromiser();
		const msg = await promise('exec', { dbId, 
			sql: 'SELECT * FROM categories WHERE id = ? LIMIT 1',
			bind: [id],
			rowMode: 'object',
			resultRows: []
		});
		const [row] = (msg.result?.resultRows ?? []) as Category[];
		return row ?? null;
	} catch (error) {
		console.error('Failed: ', error);
		return null;
	}
}

export async function addCategory(name: string) {
	try {
		const promise = await ensurePromiser();
		await promise('exec', { dbId, 
			sql: 'INSERT INTO categories (name) VALUES (?);', 
			bind: [name]
		});
	} catch (error) { 
		console.error('Failed: ', error); 
	}
}

export async function deleteCategory(id: number) {
	try {
		const promise = await ensurePromiser();
		await promise('exec', { dbId, 
			sql: `DELETE FROM categories WHERE id = ?;`,
			bind: [id]
		});
	} catch (error) {
		console.error('Failed:', error);
	}
}

export async function getAllExpenses(): Promise<Expense[]> {
	try {
		const promise = await ensurePromiser();
		const msg = await promise('exec', { dbId, 
			sql: `
				SELECT e.*, c.name AS category_name
					FROM expenses e
					JOIN categories c ON e.category_id = c.id
					ORDER BY e.date DESC
			`, 
			rowMode: 'object',
			resultRows: [] 
		});
		const rows = msg.result?.resultRows ?? [];
		return rows.map((r: any) => ({
			id: r.id,
			amount: r.amount,
			category: r.category_name,
			date: r.date,
			description: r.description,
			recurring: r.recurring_is_recurring ? {
				isRecurring: true,
				frequency: r.recurring_frequency,
				interval: r.recurring_interval
			} : undefined
		}));
	} catch (error) { 
		console.error('Failed: ', error); 
		return [];
	}
}

export async function getExpense(id: number): Promise<Expense | null> {
	try {
		const promise = await ensurePromiser();
		const msg = await promise('exec', { dbId, 
			sql: 'SELECT * FROM expenses WHERE id = ? LIMIT 1',
			bind: [id],
			rowMode: 'object',
			resultRows: []
		});
		const [row] = (msg.result?.resultRows ?? []) as Expense[];
		return row ?? null;
	} catch (error) {
		console.error('Failed: ', error);
		return null;
	}
}

export async function addExpense(expense: Omit<Expense, 'id'>, categoryId: number) {
	try {
		const promise = await ensurePromiser();
		await promise('exec', { dbId, 
			sql: `
				INSERT INTO expenses (
					amount, category_id, date, description,
					recurring_is_recurring, recurring_frequency, recurring_interval
				) VALUES (?, ?, ?, ?, ?, ?, ?);
			`, 
			bind: [
				expense.amount,
				categoryId,
				expense.date,
				expense.description,
				expense.recurring?.isRecurring ? 1 : 0,
				expense.recurring?.isRecurring ? (expense.recurring.frequency || 1) : null,
				expense.recurring?.isRecurring ? (expense.recurring.interval || 'month') : null
		]});
	} catch (error) {
		console.error('Failed:', error);
	}
}

export async function deleteExpense(id: number) {
	try {
		const promise = await ensurePromiser();
		await promise('exec', { dbId, 
			sql: `DELETE FROM expenses WHERE id = ?;`,
			bind: [id]
		});
	} catch (error) {
		console.error('Failed:', error);
	}
}

export const WorkerDB = { 
	initDB,
	getAllCategories,
	getCategory,
	addCategory,
	deleteCategory,
	getAllExpenses,
	getExpense,
	addExpense,
	deleteExpense
};

export default WorkerDB;

