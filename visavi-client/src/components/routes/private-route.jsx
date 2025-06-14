import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ element, requiredRole }) => {
	const user = useSelector((state) => state.user.user);

	if (!user) return <Navigate to="/login" />;
	if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />;

	return element;
};
