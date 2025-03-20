import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'] },
    pets: { type: Array, default: [] }
});

export default mongoose.model('User', userSchema);