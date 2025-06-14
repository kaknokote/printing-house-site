import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div`
	padding: 20px;
	color: white;
`;

const Heading = styled.h2`
	margin-bottom: 20px;
`;

const AddButton = styled.button`
	margin-bottom: 30px;
	padding: 12px 24px;
	background-color: #3b82f6;
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	font-size: 16px;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 24px;
`;

const Card = styled(Link)`
	background-color: #2c2f38;
	padding: 15px;
	border-radius: 8px;
	color: white;
	text-decoration: none;
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: 0.2s;

	&:hover {
		background-color: #3b3f4a;
	}
`;

const Image = styled.img`
	width: 100%;
	height: 160px;
	object-fit: cover;
	border-radius: 6px;
`;

const Title = styled.h3`
	margin-top: 12px;
	font-size: 18px;
	text-align: center;
`;

const Price = styled.p`
	margin-top: 6px;
	color: #aaa;
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

export const HomePage = () => {
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);
	const user = useSelector((state) => state.user.user);

	const fetchServices = async () => {
		try {
			const res = await axios.get('/api/services');
			setServices(res.data);
		} catch (err) {
			console.error('Ошибка при получении услуг:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchServices();
	}, []);

	return (
		<Container>
			<Heading>Услуги типографии</Heading>

			{user?.role === 'admin' && (
				<Link to="/services/new">
					<AddButton>Добавить услугу</AddButton>
				</Link>
			)}

			{loading ? (
				<Spinner />
			) : (
				<Grid>
					{services.map((service) => (
						<Card key={service._id} to={`/services/${service._id}`}>
							<Image src={service.image} alt={service.title} />
							<Title>{service.title}</Title>
							<Price>От {service.price} ₽ за 1шт</Price>
						</Card>
					))}
				</Grid>
			)}
		</Container>
	);
};
