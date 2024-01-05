
import mongoose, { Schema, Document } from 'mongoose';
import { Pokemon } from '../models/Pokemon.interface';
import { moveExists, getMoveByIdDB } from './Move.collection';

// Schema and model definition
const pokemonSchema: Schema = new mongoose.Schema({
    pokedexId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    moves: [{
        type: Schema.Types.ObjectId,
        ref: 'Move' // Referencing 'Move' model
    }],
    primaryType: {
        type: String,
        required: true
    },
    secondaryType: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
});
const pokemonModel = mongoose.model<Pokemon>('Pokemon', pokemonSchema, 'Pokemon');

// Verify correct Pokemon data
export function validatePokemon(pokemonData: Pokemon): boolean {
    if (
        typeof pokemonData.pokedexId !== 'number' ||
        typeof pokemonData.name !== 'string' ||
        !Array.isArray(pokemonData.moves) ||
        typeof pokemonData.primaryType !== 'string' ||
        (pokemonData.secondaryType && typeof pokemonData.secondaryType !== 'string') ||
        typeof pokemonData.description !== 'string'
    ) {
        return false;
    }

    return true;
}

// To only allow existent moves.
export async function validateMoveIds(movesIds: string[]): Promise<boolean> {
    try {
        for (const move of movesIds){
            const exists = await moveExists(move);
            if (!exists){
                return false
            }
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Obtains all the Pokemon in DB
export async function getAllPokemonDB(): Promise<Pokemon[]> {
    try {
        const allPokemon = await pokemonModel.find({}).lean().exec();
        return allPokemon;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching Pokemon data');
    }
}

// Obtain a Pokemon by its pokedexId (attribute)
export async function getPokemonByIdDB(pokedexId: Number): Promise<Pokemon[]> {
    try {
        const pokemonById = await pokemonModel.find({ pokedexId }).lean().exec();
        return pokemonById;
    } catch (error) {
        console.error(error);
        throw new Error(`Error fetching Pokemon with ID ${pokedexId}`);
    }
}

// Create a Pokemon
export async function insertPokemonDB(pokemonData: Pokemon): Promise<Pokemon> {
    try {
        const newPokemon = await pokemonModel.create(pokemonData);
        return newPokemon.toObject();
    } catch (error) {
        console.error(error);
        throw new Error('Error inserting Pokemon');
    }
}

// Update a Pokemon by its pokedexId
export async function updatePokemonDB(pokedexId: number, updatedData: Partial<Pokemon>): Promise<Pokemon | null> {
    try {
        const updatedPokemon = await pokemonModel.findOneAndUpdate(
            { pokedexId },
            updatedData,
            { new: true, runValidators: true }
        );

        return updatedPokemon?.toObject() || null;
    } catch (error) {
        console.error(error);
        throw new Error(`Error updating Pokemon with ID ${pokedexId}`);
    }
}

// Delete a Pokemon by its pokedexId
export async function deletePokemonDB(pokedexId: number): Promise<Pokemon | null> {
    try {
        const deletedPokemon = await pokemonModel.findOneAndDelete({ pokedexId });

        return deletedPokemon?.toObject() || null;
    } catch (error) {
        console.error(error);
        throw new Error(`Error deleting Pokemon with ID ${pokedexId}`);
    }
}

