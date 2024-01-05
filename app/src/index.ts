// To run: 'nodemon src/index.ts'

import mongoose from 'mongoose';
import express, { Request, Response } from 'express';

import PokemonRouter from './routes/Pokemon.route';
import MoveRouter from './routes/Move.route';
import UserRouter from './routes/User.route';

const app = express(); // Lift app
const port = 3000;

app.use(express.json()); // To access body

// Routes definition
app.use('/pokemon', PokemonRouter);
app.use('/move', MoveRouter);
app.use('/user', UserRouter);

// Non-existent routes
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'This route has not been implemented.',
        routes: ['pokemon', 'move', 'user']
    });
});

const connectionString: string = 'mongodb+srv://sebasberacu:xePZASfJ4MY2ICav@pokedex.opjpy9m.mongodb.net/Pokedex';
const main = async () => {
    // Connection to database
    await mongoose.connect(connectionString);

    app.listen(port, () => {
        console.log(`App is listening on port ${port}...`);
    });
};

main();
