import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mocksRouter from './routes/ mocks.router.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/mocks', mocksRouter);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mocksDB';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error conectando a MongoDB', err));

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:27017`);
});