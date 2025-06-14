import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormWrapper = styled.div`
	max-width: 400px;
	margin: auto;
	padding: 40px;
	background-color: #1e1f26;
	border-radius: 12px;
	color: #fff;
`;

const Input = styled.input`
	width: 100%;
	padding: 12px;
	margin-bottom: 20px;
	background: #2c2f38;
	border: 1px solid #444;
	border-radius: 6px;
	color: #fff;
`;

const Button = styled.button`
	width: 100%;
	padding: 12px;
	background: #3b82f6;
	border: none;
	border-radius: 6px;
	color: white;
	cursor: pointer;
	font-weight: bold;

	&:hover {
		background: #2563eb;
	}
`;

export const RegisterForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		if (password !== confirmPassword) {
			setError('Пароли не совпадают');
			return;
		}

		try {
			await axios.post('http://localhost:5000/api/auth/register', {
				email,
				password,
			});
			navigate('/login');
		} catch (err) {
			setError(err.response?.data?.message || 'Ошибка регистрации');
		}
	};

	return (
		<FormWrapper>
			<h2>Регистрация</h2>
			<form onSubmit={handleSubmit}>
				<Input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<Input
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<Input
					type="password"
					placeholder="Подтвердите пароль"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				{error && <p style={{ color: 'red' }}>{error}</p>}
				<Button type="submit">Зарегистрироваться</Button>
			</form>
		</FormWrapper>
	);
};
