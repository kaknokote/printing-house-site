import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/actions/user-actions';

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

const Button = styled.button`
	padding: 10px 20px;
	background-color: #3b82f6;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

export const LoginForm = () => {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (!res.ok) {
				setError(data.message || 'Ошибка входа');
				return;
			}
			dispatch(setUser(data.user, data.token));
			navigate('/');
		} catch (err) {
			console.error('Login error:', err.message);
			setError('Сервер недоступен');
		}
	};

	return (
		<FormWrapper>
			<h2 style={{ color: 'white' }}>Вход</h2>
			<form onSubmit={handleSubmit}>
				<Input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<Input
					type="password"
					name="password"
					placeholder="Пароль"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<Button type="submit">Войти</Button>
			</form>
			{error && <p style={{ color: '#ef4444', marginTop: '12px' }}>{error}</p>}
		</FormWrapper>
	);
};
