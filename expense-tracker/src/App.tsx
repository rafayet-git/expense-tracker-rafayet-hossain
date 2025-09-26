import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Expenses from './pages/Expenses';
import Home from './pages/Home';
import Overview from './pages/Overview';
import AddExpense from './pages/AddExpense';
import Header from './components/Header';

function App() {
    return (
		<Router>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/expenses" element={<Expenses />} />
					<Route path="/overview" element={<Overview />} />
					<Route path="/add-expense" element={<AddExpense />} />
				</Routes>
			</div>
		</Router>
    );
}

export default App;