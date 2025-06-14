import express from 'express';
import { register, login } from '../controllers/auth-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Приватный маршрут
router.get('/me', authMiddleware, (req, res) => {
	res.status(200).json({ message: 'Access granted', user: req.user });
});

export { router as authRoutes };
