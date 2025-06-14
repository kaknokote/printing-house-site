import mongoose from 'mongoose';

const callRequestSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		phone: { type: String, required: true },
		comment: { type: String },
		status: {
			type: String,
			enum: ['new', 'in_progress', 'done'],
			default: 'new',
		},
	},
	{ timestamps: true },
);

export const CallRequest = mongoose.model('CallRequest', callRequestSchema);
