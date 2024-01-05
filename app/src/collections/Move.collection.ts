import mongoose, { Schema, Document } from 'mongoose';
import { Move } from '../models/Move.interface';

// Schema and model definition
const moveSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
const moveModel = mongoose.model<Move>('Move', moveSchema, 'Move');

// Verify correct Move data
export function validateMove(moveData: Move): boolean {
    // Verify correct Move data
    if (
        typeof moveData.name !== 'string' ||
        typeof moveData.description !== 'string'
    ) {
        return false;
    }

    return true;
}

// Used to insert a Pokemon Move.
export async function moveExists(moveId: string): Promise<boolean> {
    try {
        const existingMove = await moveModel.findById(moveId);
        return existingMove !== null;
    } catch (error) {
        return false;
    }
}

// Obtains a move by its _id
export async function getMoveByIdDB(moveId: string): Promise<Move[]> {
    try {
        try {
            const moveById = await moveModel.find({ '_id':moveId }).lean().exec();
            return moveById;
        } catch (error) { // Possible '_id' fetching error, which means it does not exist.
            return [];
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Error fetching Move with ID ${moveId}`);;
    }
}

// Obtains all moves
export async function getMovesDB(): Promise<Move[]> {
    try {
        const allMoves = await moveModel.find({}).lean().exec();
        return allMoves;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching Move data');
    }
}

// Insert a move
export async function insertMoveDB(moveData: Move): Promise<Move> {
    try {
        const newMove = await moveModel.create(moveData);
        return newMove.toObject();
    } catch (error) {
        console.error(error);
        throw new Error('Error inserting Move');
    }
}


