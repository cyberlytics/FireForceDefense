import type { Document } from 'mongoose';

export default interface IScores extends Document {
    username: String;
    date: Date;
    level: Number;
    stars: Number;
    money: Number;
    burnedFields: Number;
}