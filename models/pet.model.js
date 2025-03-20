import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: String,
    species: String,
});

export default mongoose.model('Pet', petSchema);