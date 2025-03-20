import { Router } from 'express';
import { generateMockUsers } from '../utils/mocking.js';
import { hashPassword } from '../utils/bcrypt.js';
import UserModel from '../models/user.model.js';
import PetModel from '../models/pet.model.js';

const router = Router();

router.get('/mockingpets', async (req, res) => {
    try {
        const pets = [
            { name: 'Max', species: 'dog' },
            { name: 'Milo', species: 'cat' },
        ];
        res.json({ pets });
    } catch (error) {
        res.status(500).json({ error: 'Error generando mascotas' });
    }
});

router.get('/mockingusers', async (req, res) => {
    try {
        const users = generateMockUsers(50);
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Error generando usuarios' });
    }
});

router.post('/generateData', async (req, res) => {
    try {
        const { users = 0, pets = 0 } = req.body;

        // Generar los usuarios mock
        const mockUsers = generateMockUsers(users).map(user => ({
            ...user,
            password: hashPassword('coder123')
        }));

        // Insertar los usuarios en la base de datos
        await UserModel.insertMany(mockUsers);

        // Generar las mascotas mock
        const mockPets = Array.from({ length: pets }, (_, i) => ({
            name: `Pet ${i + 1}`,
            species: i % 2 === 0 ? 'dog' : 'cat',
        }));

        // Insertar las mascotas en la base de datos
        await PetModel.insertMany(mockPets);

        // Comprobar cuántos usuarios y mascotas fueron creados
        const totalUsers = await UserModel.countDocuments();
        const totalPets = await PetModel.countDocuments();

        // Responder con el número de registros creados
        res.json({
            message: `${users} users y ${pets} pets creados exitosamente.`,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error generando datos' });
    }
});
export default router;