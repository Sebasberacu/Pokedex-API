import { Router } from 'express';
import {
    validateUser,
    getUsersDB,
    insertUserDB,
    updateUserDB,
    deleteUserDB
} from '../collections/User.collection';

const router = Router();

// * GET: List all Users
router.get('/', async (req, res) => {
    try {
        const allUsers = await getUsersDB();
        res.status(200).json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// * POST: Create an User
// Must contain an User schema type data in req.body.
router.post('/', async (req, res) => {
    try {
        const userData = req.body;
        // Validate User Data
        if (!validateUser(userData)) {
            return res.status(400).json({
                error: 'Invalid User data',
            });
        }

        const newUser = await insertUserDB(userData);
        res.status(200).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

// * PUT /{username}: Modifies an User.
// Receives in body the fields that wants to be updated. If a field does not match, doesn't change anything.
router.put('/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const updatedData = req.body;

        const updatedUser = await updateUserDB(username, updatedData);
        if (!updatedUser) {
            return res.status(404).json({
                error: `User with username ${username} not found`,
            });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

// * DELETE /{username}: Deletes an User by its username.
router.delete('/:username', async (req, res) => {
    try {
        const username = req.params.username;

        const deletedUser = await deleteUserDB(username);
        if (!deletedUser) {
            return res.status(404).json({
                error: `User with username ${username} not found`,
            });
        }

        res.status(200).json(deletedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

export default router;