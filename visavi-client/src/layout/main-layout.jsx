import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/sidebar';

export const MainLayout = () => {
	return (
		<div style={{ display: 'flex', height: '100vh', backgroundColor: '#1a1d23' }}>
			<Sidebar />
			<div style={{ flex: 1, padding: '20px', color: '#e0e6ed' }}>
				<Outlet />
			</div>
		</div>
	);
};
