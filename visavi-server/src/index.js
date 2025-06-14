import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { authRoutes } from './routes/auth-routes.js';
import { callRequestRoutes } from './routes/call-request-routes.js';
import { adminRoutes } from './routes/admin-routes.js';
import { serviceRoutes } from './routes/service-routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/call-requests', callRequestRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('MongoDB connected');
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => console.error('Mongo error:', err));
