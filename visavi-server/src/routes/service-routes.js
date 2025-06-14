import express from 'express';
import { Service } from '../models/service-model.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { adminMiddleware } from '../middleware/admin-middleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const services = await Service.find();
		res.json(services);
	} catch (err) {
		res.status(500).json({ message: 'Ошибка при получении услуг' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const service = await Service.findById(req.params.id);
		if (!service) return res.status(404).json({ message: 'Услуга не найдена' });
		res.json(service);
	} catch (err) {
		res.status(500).json({ message: 'Ошибка при получении услуги' });
	}
});

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
	try {
		const { title, description, price, image } = req.body;
		const updated = await Service.findByIdAndUpdate(
			req.params.id,
			{ title, description, price, image },
			{ new: true },
		);
		res.json(updated);
	} catch (err) {
		res.status(500).json({ message: 'Ошибка при обновлении услуги' });
	}
});

// Добавление новой услуги
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
	try {
		const { title, description, price, image } = req.body;
		const service = new Service({ title, description, price, image });
		await service.save();
		res.status(201).json(service);
	} catch (err) {
		res.status(500).json({
			message: 'Ошибка при создании услуги',
			error: err.message,
		});
	}
});

// Удаление услуги
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
	try {
		await Service.findByIdAndDelete(req.params.id);
		res.json({ message: 'Услуга удалена' });
	} catch (err) {
		res.status(500).json({ message: 'Ошибка при удалении', error: err.message });
	}
});

export const serviceRoutes = router;
