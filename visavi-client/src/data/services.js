import businessCardsImg from '../../public/assets/services/businessCardsImg.jpeg';
import brochuresImg from '../../public/assets/services/brochuresImg.jpg';
import stickersImg from '../../public/assets/services/stickersImg.avif';

export const services = [
	{
		id: 'business-cards',
		title: 'Визитки',
		description: 'Печать визиток любых форматов.',
		fullDescription:
			'Офсетная и цифровая печать, матовая и глянцевая ламинация, дизайнерская бумага.',
		price: 'от 500 ₽ за 100 шт.',
		image: businessCardsImg,
	},
	{
		id: 'flyers',
		title: 'Флаеры',
		description: 'Флаеры для рекламы и промо.',
		fullDescription:
			'Форматы A5 и A6, двусторонняя печать, срочное изготовление за 1 день.',
		price: 'от 900 ₽ за 500 шт.',
		image: stickersImg,
	},
	{
		id: 'brochures',
		title: 'Брошюры',
		description: 'Печать брошюр и буклетов.',
		fullDescription:
			'Скрепление на скобу, цветная или ч/б печать, развороты и обложки.',
		price: 'от 35 ₽ за штуку',
		image: brochuresImg,
	},
];
