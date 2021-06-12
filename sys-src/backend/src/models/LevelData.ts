import mongoose, { Schema } from 'mongoose';
import type ILevelData from '../interfaces/LevelData';
import Joi from "joi";

const levelDataSchema: Schema = new Schema(
    {
        username: String,
        date: Date,
        level: Number,
        stars: Number,
        money: Number,
        burnedFields: Number
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ILevelData>('LevelData', levelDataSchema);