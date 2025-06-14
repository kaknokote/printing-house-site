import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user-model.js';

export const register = async (req, res) => {
	try {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ email, password: hashedPassword });
		await user.save();

		res.status(201).json({ message: 'User created' });
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid password' });
		}

		const token = jwt.sign(
			{ userId: user._id, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' },
		);

		res.status(200).json({
			token,
			user: {
				id: user._id,
				email: user.email,
				role: user.role,
			},
		});
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message });
	}
};
