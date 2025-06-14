import { Routes, Route } from 'react-router-dom';
import {
	HomePage,
	LoginPage,
	RegisterPage,
	CallRequestPage,
	ErrorPage,
	AdminPage,
	AdminCallRequestsPage,
	ServicePage,
	AddServicePage,
} from './pages';
import { MainLayout } from './layout/main-layout';
import { PrivateRoute } from './components/routes/private-route';

function App() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/services/:id" element={<ServicePage />} />
				<Route path="/call-request" element={<CallRequestPage />} />
				<Route path="/services/new" element={<AddServicePage />} />
				<Route
					path="/admin"
					element={
						<PrivateRoute requiredRole="admin" element={<AdminPage />} />
					}
				/>
				<Route
					path="/admin/call-requests"
					element={
						<PrivateRoute
							requiredRole="admin"
							element={<AdminCallRequestsPage />}
						/>
					}
				/>
			</Route>

			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
}

export default App;
