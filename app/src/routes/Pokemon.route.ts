import { Router } from 'express';
import {
    validatePokemon,
    validateMoveIds,
    getAllPokemonDB,
    getPokemonByIdDB,
    insertPokemonDB,
    updatePokemonDB,
    deletePokemonDB
} from '../collections/Pokemon.collection';
import authenticationMiddleware from './AuthMiddleware.route'; // Middleware import

const router = Router();

router.use(authenticationMiddleware); // Apply middleware

// * GET: List all Pokemon
router.get('/', async (req, res) => {
    try {
        const allPokemon = await getAllPokemonDB();
        res.status(200).json(allPokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// * GET /{pokedexId}: Gets a Pokemon by its PokedexId.
router.get('/:pokedexId', async (req, res) => {
    try {
        const pokemon = await getPokemonByIdDB(parseInt(req.params.pokedexId));
        if (pokemon.length === 0){
            res.status(404).json({
                error: "Pokemon not found."
            });
        } else {
            res.status(200).json(pokemon);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// * POST: Creates a Pokemon.
// Must contain a Pokemon schema type data in req.body.
router.post('/', async (req, res) => {
    try {
        const pokemonData = req.body;
        
        // Validate Pokemon Data
        if (!validatePokemon(pokemonData)) {
            return res.status(400).json({
                error: 'Invalid Pokemon data',
            });
        }

        // Validate existent moves
        const validMoveIds = await validateMoveIds(pokemonData.moves);
        if (!validMoveIds) {
            return res.status(400).json({
                error: 'Move(s) not found!',
            });
        }

        const newPokemon = await insertPokemonDB(pokemonData);
        res.status(200).json(newPokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

// * PUT /{pokedexId}: Modifies a Pokemon.
// Receives in body the fields that wants to be updated. If a field does not match, doesn't change anything.
router.put('/:pokedexId', async (req, res) => {
    try {
        const pokedexId = parseInt(req.params.pokedexId);
        const updatedData = req.body;

        // Validate existent moves
        const validMoveIds = await validateMoveIds(updatedData.moves);
        if (!validMoveIds) {
            return res.status(400).json({
                error: 'Move(s) not found!',
            });
        }

        const updatedPokemon = await updatePokemonDB(pokedexId, updatedData);
        if (!updatedPokemon) {
            return res.status(404).json({
                error: `Pokemon with ID ${pokedexId} not found`,
            });
        }

        res.status(200).json(updatedPokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

// * DELETE /{pokedexId}: Deletes a Pokemon by its PokedexId.
router.delete('/:pokedexId', async (req, res) => {
    try {
        const pokedexId = parseInt(req.params.pokedexId);

        const deletedPokemon = await deletePokemonDB(pokedexId);
        if (!deletedPokemon) {
            return res.status(404).json({
                error: `Pokemon with ID ${pokedexId} not found`,
            });
        }

        res.status(200).json(deletedPokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

export default router;
