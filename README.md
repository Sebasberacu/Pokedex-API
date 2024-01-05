# Pokedex-API

This project is a simple backend application for a Pokédex, implemented in TypeScript and using the Express.js framework along with the MongoDB database via Mongoose. The application provides three sets of paths for data collections: Pokémon, Moves and Users. It provides basic CRUD operations corresponding to the respective collections.

Includes validation measures to ensure data integrity, such as the existence of Moves before assigning them to a Pokémon. In addition, basic authentication middleware has been implemented that requires users to be authenticated to access Pokémon and Moves paths, but not for User paths.

The project provides a modular and scalable structure for managing Pokémon-related data and allows user authentication for certain functionality. This backend could be used as the basis for a more complex application involving a user interface, more robust authentication and other advanced features.

*This app was created as a lab for a web development course in college*.

## Available routes
**/user**:
- GET: List all users.
- POST: Create an user.
- PUT /{username}: Modifies an user.
- DELETE /{username}: Deletes an user.

**/pokemon**:
- GET: List all Pokemon.
- GET /{pokedexNumber}: Gets a Pokemon by its pokedexId.
- POST: Creates a Pokemon.
- PUT /{pokedexNuber}: Modifies a Pokemon.
- DELETE /{pokedexId}: Deletes a Pokemon by its PokedexId.

**/move**:
- GET: List all moves.
- GET /{_id}: Obtain a specific move by its _id.
- POST: Create a move.

## Made by
[Sebastián Bermúdez A.](https://github.com/Sebasberacu)




