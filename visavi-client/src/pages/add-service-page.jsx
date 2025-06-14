import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
	padding: 20px;
	color: white;
`;

const Heading = styled.h2`
	margin-bottom: 20px;
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
	margin-top: 30px;
	padding: 10px 20px;
	background-color: #3b82f6;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

export const AddServicePage = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		title: '',
		description: '',
		price: '',
		imageFilename: '',
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = JSON.parse(localStorage.getItem('user'))?.token;
			await axios.post(
				'/api/services',
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
			navigate('/');
		} catch (err) {
			console.error('Ошибка при добавлении услуги:', err);
			alert('Не удалось добавить услугу');
		}
	};

	return (
		<Container>
			<Heading>Добавить новую услугу</Heading>
			<form onSubmit={handleSubmit}>
				<Label>Заголовок</Label>
				<Input
					type="text"
					name="title"
					value={form.title}
					onChange={handleChange}
					required
				/>

				<Label>Полное описание</Label>
				<TextArea
					name="description"
					value={form.description}
					onChange={handleChange}
					required
				/>

				<Label>Цена (₽)</Label>
				<Input
					type="number"
					name="price"
					value={form.price}
					onChange={handleChange}
					required
				/>

				<Label>Имя изображения</Label>
				<InputGroup>
					<Prefix>/assets/services/</Prefix>
					<SuffixInput
						type="text"
						name="imageFilename"
						value={form.imageFilename}
						onChange={handleChange}
						required
					/>
				</InputGroup>

				<Button type="submit">Сохранить</Button>
			</form>
		</Container>
	);
};
