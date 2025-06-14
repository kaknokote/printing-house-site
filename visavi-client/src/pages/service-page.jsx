import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
	padding: 20px;
	color: white;
`;

const Image = styled.img`
	width: 300px;
	border-radius: 8px;
	object-fit: cover;
`;

const Label = styled.label`
	display: block;
	margin-top: 20px;
	margin-bottom: 6px;
`;

const Input = styled.input`
	width: 100%;
	padding: 10px;
	background: #1e1e1e;
	color: white;
	border: 1px solid #444;
	border-radius: 4px;
`;

const TextArea = styled.textarea`
	width: 100%;
	padding: 10px;
	min-height: 100px;
	background: #1e1e1e;
	color: white;
	border: 1px solid #444;
	border-radius: 4px;
`;

const InputGroup = styled.div`
	display: flex;
	align-items: center;
`;

const Prefix = styled.span`
	background: #2c2f38;
	padding: 10px;
	border: 1px solid #444;
	border-right: none;
	border-radius: 4px 0 0 4px;
	color: #aaa;
`;

const SuffixInput = styled.input`
	flex: 1;
	padding: 10px;
	background: #1e1e1e;
	color: white;
	border: 1px solid #444;
	border-left: none;
	border-radius: 0 4px 4px 0;
`;

const Button = styled.button`
	background-color: ${(props) => (props.$cancel ? '#777' : '#3b82f6')};
	margin-top: 30px;
	padding: 10px 20px;
	color: white;
	border: none;
	cursor: pointer;
	border-radius: 4px;
	margin-right: 10px;
`;
const DeleteButton = styled.button`
	margin-top: 15px;
	padding: 8px 16px;
	background-color: #dc2626;
	color: white;
	border: none;
	cursor: pointer;
	margin-left: 10px;
`;

export const ServicePage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const user = useSelector((state) => state.user.user);
	const [form, setForm] = useState(null);
	const [editMode, setEditMode] = useState(false);

	const handleDelete = async () => {
		const confirmed = window.confirm('Вы уверены, что хотите удалить эту услугу?');
		if (!confirmed) return;

		try {
			const token = JSON.parse(localStorage.getItem('user'))?.token;
			await axios.delete(`/api/services/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			navigate('/');
		} catch (err) {
			console.error('Ошибка при удалении:', err);
			alert('Не удалось удалить услугу');
		}
	};

	useEffect(() => {
		const fetchService = async () => {
			try {
				const res = await axios.get(`/api/services/${id}`);
				const imageFilename =
					res.data.image?.replace('/assets/services/', '') || '';
				setForm({
					title: res.data.title,
					description: res.data.description,
					price: res.data.price,
					imageFilename,
				});
			} catch (err) {
				console.error('Ошибка при загрузке услуги:', err);
			}
		};
		fetchService();
	}, [id]);

	if (!form) return <Container>Загрузка...</Container>;

	const handleChange = (e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSave = async () => {
		try {
			const token = JSON.parse(localStorage.getItem('user'))?.token;
			await axios.put(
				`/api/services/${id}`,
				{
					title: form.title,
					description: form.description,
					price: form.price,
					image: `/assets/services/${form.imageFilename}`,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			setEditMode(false);
		} catch (err) {
			console.error('Ошибка при сохранении:', err);
		}
	};

	const handleCancel = () => {
		setEditMode(false);
	};

	return (
		<Container>
			{editMode ? (
				<>
					<h2>Редактирование</h2>

					<Label>Заголовок</Label>
					<Input name="title" value={form.title} onChange={handleChange} />

					<Label>Полное описание</Label>
					<TextArea
						name="description"
						value={form.description}
						onChange={handleChange}
					/>

					<Label>Цена</Label>
					<Input name="price" value={form.price} onChange={handleChange} />

					<Label>Имя изображения</Label>
					<InputGroup>
						<Prefix>/assets/services/</Prefix>
						<SuffixInput
							name="imageFilename"
							value={form.imageFilename}
							onChange={handleChange}
						/>
					</InputGroup>

					<Button onClick={handleSave}>Сохранить</Button>
					<Button $cancel onClick={handleCancel}>
						Отмена
					</Button>
				</>
			) : (
				<>
					<h2>{form.title}</h2>
					<Image
						src={`/assets/services/${form.imageFilename}`}
						alt={form.title}
					/>
					<p style={{ marginTop: '10px' }}>{form.description}</p>
					<p style={{ fontWeight: 'bold', marginTop: '10px' }}>
						Цена: {form.price} ₽
					</p>

					{user?.role === 'admin' && (
						<>
							<Button onClick={() => setEditMode(true)}>
								Редактировать
							</Button>
							<DeleteButton onClick={handleDelete}>Удалить</DeleteButton>
						</>
					)}
				</>
			)}
		</Container>
	);
};
