import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Expenses from './pages/Expenses';
import Home from './pages/Home';
import Overview from './pages/Overview';
import AddExpense from './pages/AddExpense';
import Header from './components/Header';
import { initDB } from './services/WorkerDB';

function App() {
 	const [isDbReady, setIsDbReady] = useState(false);
  	const [error, setError] = useState<string | null>(null);
	
	useEffect(() => {
		initDB()
			.then(() => {
				setIsDbReady(true);
			})
			.catch((error) => {
				console.error('Failed:', error);
				setError('Failed to initialize database');
			});
	}, []);

	const DatabaseLoadingPage = () => (
		<div className="flex items-center justify-center min-h-48">
			{error ? (
				<div className="text-center">
					<div className="text-red-500 text-lg font-bold">Loading Failed</div>
					<div className="text-gray-700">{error}</div>
				</div>
			) : (
				<div className="text-center">
					<div className="text-gray-700">Loading Database...</div>
				</div>
			)}
		</div>
	);

    return (
		<Router>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/expenses" element={isDbReady ? <Expenses /> : <DatabaseLoadingPage />} />
					<Route path="/overview" element={isDbReady ? <Overview /> : <DatabaseLoadingPage />} />
					<Route path="/add-expense" element={isDbReady ? <AddExpense /> : <DatabaseLoadingPage />} />
				</Routes>
				
			</div>
		</Router>
	);
}

export default App;