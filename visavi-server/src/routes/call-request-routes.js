import express from 'express';
import {
	createCallRequest,
	getCallRequests,
	deleteCallRequest,
	updateCallRequest,
} from '../controllers/call-request-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { adminMiddleware } from '../middleware/admin-middleware.js';

const router = express.Router();

router.post('/', createCallRequest); // публичный
router.get('/', authMiddleware, getCallRequests); // только для авторизованных
router.patch('/:id', authMiddleware, adminMiddleware, updateCallRequest);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCallRequest);

export { router as callRequestRoutes };
