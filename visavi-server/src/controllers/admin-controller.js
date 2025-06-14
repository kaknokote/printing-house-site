import { User } from '../models/user-model.js';
import { CallRequest } from '../models/call-request-model.js';

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({}, '-password'); // без пароля
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: 'Ошибка при получении пользователей' });
	}
};

export const deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.json({ message: 'Пользователь удалён' });
	} catch (err) {
		res.status(500).json({ message: 'Ошибка при удалении' });
	}
};

export const updateUserRole = async (req, res) => {
	try {
		const { role } = req.body;
		const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: 'Ошибка при изменении роли' });
	}
};

export const getAllCallRequests = async (req, res) => {
	try {
		const requests = await CallRequest.find().sort({ createdAt: -1 });
		res.json(requests);
	} catch (err) {
		res.status(500).json({ message: 'Ошибка при получении заказов звонков' });
	}
};
