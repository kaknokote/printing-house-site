import { Service } from '../models/service-model.js';

export const getServiceById = async (req, res) => {
	try {
		const service = await Service.findById(req.params.id);
		if (!service) {
			return res.status(404).json({ message: 'Service not found' });
		}
		res.json(service);
	} catch (err) {
		res.status(500).json({ message: 'Error fetching service', error: err.message });
	}
};

export const updateService = async (req, res) => {
	try {
		const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updated) {
			return res.status(404).json({ message: 'Service not found' });
		}
		res.json(updated);
	} catch (err) {
		res.status(500).json({ message: 'Error updating service', error: err.message });
	}
};
