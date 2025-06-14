import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
	padding: 20px;
	color: white;
`;

const UserTable = styled.table`
	width: 100%;
	border-collapse: collapse;

	th,
	td {
		border: 1px solid #444;
		padding: 10px;
		text-align: left;
	}

	th {
		background-color: #333;
	}
`;

const RoleButton = styled.button`
	width: 200px;
	margin-right: 8px;
	background-color: #3b82f6;
	color: white;
	border: none;
	padding: 6px 12px;
	cursor: pointer;
	text-align: center;

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const DeleteButton = styled(RoleButton)`
	width: 100px;
	background-color: #dc2626;
`;

export const AdminPage = () => {
	const [users, setUsers] = useState([]);
	const [requests, setRequests] = useState([]);

	const currentUserId = JSON.parse(localStorage.getItem('user'))?.user?.id;

	const fetchUsers = async () => {
		try {
			const token = JSON.parse(localStorage.getItem('user'))?.token;
			const res = await axios.get('/api/admin/users', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setUsers(res.data);
		} catch (err) {
			console.error('Ошибка при получении пользователей:', err);
		}
	};

	const handleDelete = async (id) => {
		const token = JSON.parse(localStorage.getItem('user'))?.token;
		await axios.delete(`/api/admin/users/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		fetchUsers();
	};

	const toggleRole = async (id, currentRole) => {
		const token = JSON.parse(localStorage.getItem('user'))?.token;
		const newRole = currentRole === 'admin' ? 'user' : 'admin';
		await axios.patch(
			`/api/admin/users/${id}`,
			{ role: newRole },
			{
				headers: { Authorization: `Bearer ${token}` },
			},
		);
		fetchUsers();
	};

	const fetchCallRequests = async () => {
		try {
			const token = JSON.parse(localStorage.getItem('user'))?.token;
			const res = await axios.get('/api/admin/call-requests', {
				headers: { Authorization: `Bearer ${token}` },
			});
			setRequests(res.data);
		} catch (err) {
			console.error('Ошибка при получении заявок:', err);
		}
	};

	useEffect(() => {
		fetchUsers();
		fetchCallRequests();
	}, []);

	return (
		<Container>
			<h2>Пользователи</h2>
			<UserTable>
				<thead>
					<tr>
						<th>Email</th>
						<th>Роль</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user._id}>
							<td>{user.email}</td>
							<td>{user.role}</td>
							<td>
								<RoleButton
									onClick={() => toggleRole(user._id, user.role)}
									disabled={user._id === currentUserId}
								>
									Сделать{' '}
									{user.role === 'admin' ? 'пользователем' : 'админом'}
								</RoleButton>

								<DeleteButton
									onClick={() => handleDelete(user._id)}
									disabled={user._id === currentUserId}
								>
									Удалить
								</DeleteButton>
							</td>
						</tr>
					))}
				</tbody>
			</UserTable>
		</Container>
	);
};
