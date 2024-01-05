import { Document } from 'mongoose';

export interface Move extends Document {
    name: string;
    description: string;
}
