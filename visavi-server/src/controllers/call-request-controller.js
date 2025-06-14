import { CallRequest } from '../models/call-request-model.js';

export const createCallRequest = async (req, res) => {
	try {
		const { name, phone, comment } = req.body;
		const newRequest = new CallRequest({ name, phone, comment });
		await newRequest.save();
		res.status(201).json(newRequest);
	} catch (err) {
		res.status(500).json({ message: 'Failed to create request', error: err.message });
	}
};

export const getCallRequests = async (req, res) => {
	try {
		const requests = await CallRequest.find().sort({ createdAt: -1 });
		res.status(200).json(requests);
	} catch (err) {
		res.status(500).json({ message: 'Failed to fetch requests', error: err.message });
	}
};

export const closeCallRequest = async (req, res) => {
	try {
		const { id } = req.params;

		const updated = await CallRequest.findByIdAndUpdate(
			id,
			{ closed: true },
			{ new: true },
		);

		if (!updated) {
			return res.status(404).json({ message: 'Заявка не найдена' });
		}

		res.json({ message: 'Заявка закрыта', request: updated });
	} catch (err) {
		res.status(500).json({
			message: 'Ошибка при закрытии заявки',
			error: err.message,
		});
	}
};

export const updateCallRequest = async (req, res) => {
	try {
		const { id } = req.params;
		const update = {};

		if ('status' in req.body) update.status = req.body.status;
		if ('closed' in req.body) update.closed = req.body.closed;

		const request = await CallRequest.findByIdAndUpdate(id, update, { new: true });

		if (!request) {
			return res.status(404).json({ message: 'Request not found' });
		}

		res.json(request);
	} catch (err) {
		res.status(500).json({ message: 'Server error', error: err.message });
	}
};

export const deleteCallRequest = async (req, res) => {
	try {
		const { id } = req.params;

		const deleted = await CallRequest.findByIdAndDelete(id);

		if (!deleted) {
			return res.status(404).json({ message: 'Заявка не найдена' });
		}

		res.json({ message: 'Заявка удалена', request: deleted });
	} catch (err) {
		res.status(500).json({ message: 'Ошибка при удалении', error: err.message });
	}
};
