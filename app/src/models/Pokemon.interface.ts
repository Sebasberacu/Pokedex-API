import { Document } from 'mongoose';

export interface Pokemon extends Document {
    pokedexId: number;
    name: string;
    moves: string[];
    primaryType: string;
    secondaryType?: string;
    description: string;
}
