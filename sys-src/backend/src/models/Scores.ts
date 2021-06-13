import mongoose, { Schema } from 'mongoose';
import type IScores from '../types/Scores';

const scoreSchema: Schema = new Schema(
    {
        username: String,
        level: Number,
        stars: Number,
        money: Number,
        burnedFields: Number
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IScores>('Scores', scoreSchema);