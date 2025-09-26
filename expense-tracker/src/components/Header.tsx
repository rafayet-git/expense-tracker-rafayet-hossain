import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<div className="header">
			<nav className="nav">
                <ul className="flex gap-4 p-4 bg-gray-100">
                <li><NavLink to="/" className={({ isActive }) => isActive ? 'font-bold' : ''}>Home</NavLink></li>
                <li><NavLink to="/expenses" className={({ isActive }) => isActive ? 'font-bold' : ''}>Expenses</NavLink></li>
                <li><NavLink to="/overview" className={({ isActive }) => isActive ? 'font-bold' : ''}>Overview</NavLink></li>
                <li><NavLink to="/add-expense" className={({ isActive }) => isActive ? 'font-bold text-green-600' : 'text-green-600'}>Add Expense</NavLink></li>
                </ul>
            </nav>
		</div>
	);
}

export default Header;
