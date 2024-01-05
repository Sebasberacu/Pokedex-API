import { Router } from 'express';
import {
    validateMove,
    getMovesDB,
    insertMoveDB,
    getMoveByIdDB
} from '../collections/Move.collection';

import authenticationMiddleware from './AuthMiddleware.route'; // Middleware import

const router = Router();

router.use(authenticationMiddleware); // Apply middleware

// * GET: List all Moves
router.get('/', async (req, res) => {
    try {
        const allMoves = await getMovesDB();
        res.status(200).json(allMoves);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// * GET /{_id}: Obtain a specific move by its _id
router.get('/:moveId', async (req, res) => {
    try {
        const move = await getMoveByIdDB(req.params.moveId);
        if (move.length === 0){
            res.status(404).json({
                error: "Move not found."
            });
        } else {
            res.status(200).json(move);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// * POST: Create a Move
// Must contain a Move schema type data in req.body.
router.post('/', async (req, res) => {
    try {
        const moveData = req.body;
        // Validate Move Data
        if (!validateMove(moveData)) {
            return res.status(400).json({
                error: 'Invalid Move data',
            });
        }

        const newMove = await insertMoveDB(moveData);
        res.status(200).json(newMove);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

export default router;
