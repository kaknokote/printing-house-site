import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { adminMiddleware } from '../middleware/admin-middleware.js';
import {
	getAllUsers,
	deleteUser,
	updateUserRole,
	getAllCallRequests,
} from '../controllers/admin-controller.js';

const router = express.Router();

router.get('/test', authMiddleware, adminMiddleware, (req, res) => {
	res.json({ message: 'Доступ разрешён: Вы админ', user: req.user });
});

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);
router.patch('/users/:id', authMiddleware, adminMiddleware, updateUserRole);

router.get('/call-requests', authMiddleware, adminMiddleware, getAllCallRequests);

export const adminRoutes = router;
