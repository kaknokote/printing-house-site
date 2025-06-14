import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
	padding: 20px;
	color: white;
`;

const Table = styled.table`
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

const Button = styled.button`
	padding: 6px 12px;
	background-color: #3b82f6;
	color: white;
	border: none;
	cursor: pointer;

	&:disabled {
		background-color: #666;
		cursor: not-allowed;
	}
`;

const DeleteButton = styled.button`
	margin-left: 8px;
	background-color: #dc2626;
	color: white;
	border: none;
	padding: 6px 12px;
	cursor: pointer;
`;

const Spinner = styled.div`
	margin: 40px auto;
	border: 4px solid #444;
	border-top: 4px solid #3b82f6;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	animation: spin 1s linear infinite;

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`;

export const AdminCallRequestsPage = () => {
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchRequests = async () => {
		try {
			const token = JSON.parse(localStorage.getItem('user'))?.token;

			const res = await axios.get('/api/call-requests', {
				headers: { Authorization: `Bearer ${token}` },
			});
			setRequests(res.data);
		} catch (err) {
			console.error('Ошибка при получении заявок:', err);
		} finally {
			setLoading(false);
		}
	};

	const closeRequest = async (id) => {
		try {
			const token = JSON.parse(localStorage.getItem('user'))?.token;
			await axios.patch(
				`/api/call-requests/${id}`,
				{ status: 'closed' },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			fetchRequests();
		} catch (err) {
			console.error('Ошибка при закрытии заявки:', err);
		}
	};

	const deleteRequest = async (id) => {
		try {
			const token = JSON.parse(localStorage.getItem('user'))?.token;
			await axios.delete(`/api/call-requests/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			fetchRequests();
		} catch (err) {
			console.error('Ошибка при удалении заявки:', err);
		}
	};

	useEffect(() => {
		fetchRequests();
	}, []);

	return (
		<Container>
			<h2>Заявки на звонок</h2>

			{loading ? (
				<Spinner />
			) : (
				<Table>
					<thead>
						<tr>
							<th>Имя</th>
							<th>Телефон</th>
							<th>Комментарий</th>
							<th>Статус</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						{requests.map((req) => (
							<tr key={req._id}>
								<td>{req.name}</td>
								<td>{req.phone}</td>
								<td>{req.comment}</td>
								<td>{req.status === 'closed' ? 'Закрыта' : 'Открыта'}</td>
								<td>
									<Button
										onClick={() => closeRequest(req._id)}
										disabled={req.status === 'closed'}
									>
										Закрыть
									</Button>
									<DeleteButton onClick={() => deleteRequest(req._id)}>
										Удалить
									</DeleteButton>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</Container>
	);
};
