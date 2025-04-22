import mongoose from 'mongoose';

const NEXT_MONGODB_URI = process.env.NEXT_MONGODB_URI || '';

if (!NEXT_MONGODB_URI) throw new Error('NEXT_MONGODB_URI não está definida!');

export const connectDB = async () => {
	if (mongoose.connection.readyState === 1) return;

	try {
		await mongoose.connect(NEXT_MONGODB_URI, { dbName: 'cms' });
	} catch (error) {
		console.error('Erro ao conectar ao MongoDB', error);
	}
};
