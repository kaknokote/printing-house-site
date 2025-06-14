import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #1a1a1a;
	color: #fff;
	text-align: center;
	padding: 20px;
`;

const Title = styled.h1`
	font-size: 48px;
	color: #e11d48;
	margin-bottom: 20px;
`;

const Message = styled.p`
	font-size: 20px;
	color: #aaa;
	margin-bottom: 30px;
`;

const Button = styled.button`
	padding: 10px 20px;
	background-color: #3b82f6;
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	font-size: 16px;

	&:hover {
		background-color: #2563eb;
	}
`;

export const ErrorPage = () => {
	const navigate = useNavigate();

	return (
		<Wrapper>
			<Title>404. Увы и ах :(</Title>
			<Message>Ты не туда завернул. Такой страницы у нас нет.</Message>
			<Button onClick={() => navigate(-1)}>Назад</Button>
		</Wrapper>
	);
};
