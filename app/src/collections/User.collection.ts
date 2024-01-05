import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../models/User.interface';

// Schema and model definition
const userSchema: Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const userModel = mongoose.model<User>('User', userSchema, 'User');

// For middleware
export async function checkUser(username: string, password: string): Promise<boolean> {
    try {
        const user = await userModel.findOne({ username, password });
        return user !== null;
    } catch (error) {
        console.error(error);
        throw new Error('Error checking user existence');
    }
}

// Verify correct User data
export function validateUser(userData: User): boolean {
    if (
        typeof userData.username !== 'string' ||
        typeof userData.password !== 'string'
    ) {
        return false;
    }

    return true;
}

// Obtains all the users in DB
export async function getUsersDB(): Promise<User[]> {
    try {
        const allUsers = await userModel.find({}).lean().exec();
        return allUsers;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching User data');
    }
}

// Create an user
export async function insertUserDB(userData: User): Promise<User> {
    try {
        const newUser = await userModel.create(userData);
        return newUser.toObject();
    } catch (error) {
        console.error(error);
        throw new Error('Error inserting User');
    }
}

// Update an user by its username
export async function updateUserDB(username: string, updatedData: Partial<User>): Promise<User | null> {
    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { username },
            updatedData,
            { new: true, runValidators: true }
        );
        return updatedUser?.toObject() || null;
    } catch (error) {
        console.error(error);
        throw new Error(`Error updating User with username ${username}`);
    }
}

// Delete an user by its username
export async function deleteUserDB(username: string): Promise<User | null> {
    try {
        const deletedUser = await userModel.findOneAndDelete({ username });
        return deletedUser?.toObject() || null;
    } catch (error) {
        console.error(error);
        throw new Error(`Error deleting User with username ${username}`);
    }
}
