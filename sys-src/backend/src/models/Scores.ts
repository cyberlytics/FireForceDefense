import mongoose, { Schema } from 'mongoose';
import type IScores from '../types/Scores';

const scoreSchema: Schema = new Schema(
    {
        username: String,
        level: String,
        stars: Number,
        money: Number,
        burnedFields: Number,
        time: Number,
    },
    {
        timestamps: true,
    },
);

export const GameModel = mongoose.model<IScores>('Scores', scoreSchema);
