import { useState } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.div`
	max-width: 400px;
	margin: 0 auto;
	background-color: #1e1f25;
	padding: 24px;
	border-radius: 8px;
`;

const Input = styled.input`
	width: 100%;
	margin-bottom: 12px;
	padding: 10px;
	border-radius: 4px;
	border: none;
	background-color: #2b2d36;
	color: #fff;
`;

const Textarea = styled.textarea`
	width: 100%;
	margin-bottom: 12px;
	padding: 10px;
	border-radius: 4px;
	border: none;
	background-color: #2b2d36;
	color: #fff;
	resize: vertical;
`;

const Button = styled.button`
	padding: 10px 20px;
	background-color: #3b82f6;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

const Message = styled.p`
	color: #f87171;
	text-align: center;
	margin-top: 20px;
`;

export const CallRequestForm = () => {
	const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });
	const [success, setSuccess] = useState(false);

	const user = JSON.parse(localStorage.getItem('user'));

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/call-requests', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user?.token}`,
				},
				body: JSON.stringify(formData),
			});
			if (res.ok) {
				setSuccess(true);
				setFormData({ name: '', phone: '', comment: '' });
			}
		} catch (err) {
			console.error('Ошибка при отправке заявки:', err);
		}
	};

	if (!user) {
		return (
			<FormWrapper>
				<Message>
					Только авторизованные пользователи могут оставить заявку.
				</Message>
			</FormWrapper>
		);
	}

	return (
		<FormWrapper>
			<h2 style={{ color: 'white' }}>Заявка на обратный звонок</h2>
			<form onSubmit={handleSubmit}>
				<Input
					type="text"
					name="name"
					placeholder="Имя"
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<Input
					type="text"
					name="phone"
					placeholder="Телефон"
					value={formData.phone}
					onChange={handleChange}
					required
				/>
				<Textarea
					name="comment"
					placeholder="Комментарий"
					value={formData.comment}
					onChange={handleChange}
				/>
				<Button type="submit">Отправить</Button>
			</form>
			{success && (
				<p style={{ color: '#4ade80', marginTop: '12px' }}>Заявка отправлена!</p>
			)}
		</FormWrapper>
	);
};
