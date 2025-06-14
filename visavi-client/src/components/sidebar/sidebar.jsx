import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/user-actions';
import { List, User, LogOut, Home, Phone, Shield } from 'lucide-react';

const StyledLink = styled(Link)`
	color: #fff;
	text-decoration: none;
	font-size: 15px;

	&:hover {
		color: #3b82f6;
	}
`;

const SidebarWrapper = styled.div`
	width: 220px;
	background-color: #2c2f38;
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const NavItem = styled(StyledLink)`
	display: flex;
	align-items: center;
	gap: 10px;
	color: #fff;
	text-decoration: none;
	font-size: 15px;

	&:hover {
		color: #3b82f6;
	}
`;

const NavSection = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const UserSection = styled.div`
	padding: 20px;
	border-top: 1px solid #444;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Email = styled.span`
	color: #ccc;
	font-size: 14px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const LogoutBtn = styled.button`
	background: transparent;
	border: none;
	color: #888;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 14px;
	transition: color 0.2s;

	&:hover {
		color: #fff;
	}
`;

export const Sidebar = () => {
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<SidebarWrapper>
			<NavSection>
				<NavItem to="/">
					<Home size={18} />
					Главная
				</NavItem>

				<NavItem to="/call-request">
					<Phone size={18} />
					Заказ звонка
				</NavItem>

				{user?.role === 'admin' && (
					<>
						<NavItem to="/admin">
							<Shield size={18} />
							Админка
						</NavItem>
						<NavItem to="/admin/call-requests">
							<List size={18} />
							Поступившие заявки
						</NavItem>
					</>
				)}
			</NavSection>

			<UserSection>
				{user ? (
					<>
						<User size={18} />
						<Email>{user.email}</Email>
						<LogoutBtn onClick={handleLogout}>
							<LogOut size={16} />
							Выйти
						</LogoutBtn>
					</>
				) : (
					<>
						<StyledLink to="/login">Вход</StyledLink>
						<StyledLink to="/register">Регистрация</StyledLink>
					</>
				)}
			</UserSection>
		</SidebarWrapper>
	);
};
