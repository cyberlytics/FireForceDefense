import type { Document } from 'mongoose';

export default interface IScores extends Document {
    username: string;
    level: number;
    stars: number;
    money: number;
    burnedFields: number;
    time: number;
}
