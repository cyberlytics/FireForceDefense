import { GameModel } from '../models/Scores';
import mongoose from 'mongoose';
import type IScores from '../types/Scores';

async function findScoreById(id: string): Promise<IScores> {
    if (mongoose.isValidObjectId(id)) {
        const scores = await GameModel.findById(id).exec();

        if (scores == null) {
            throw 'No data found!';
        }
        return scores;
    } else {
        throw 'Invalid ObjectId!';
    }
}

async function deleteScoreById(id: string): Promise<IScores> {
    if (mongoose.isValidObjectId(id)) {
        const deletedScores = await GameModel.findOneAndDelete({ _id: id }).exec();

        if (deletedScores == null) {
            throw 'No data found!';
        }

        return deletedScores;
    } else {
        throw 'Invalid ObjectId!';
    }
}

async function createScore(request: {
    username: string;
    level: string;
    stars: number;
    money: number;
    burnedFields: number;
}): Promise<IScores> {
    const scores = new GameModel(request);
    await scores.save();

    return scores;
}

async function updateScore(request: {
    username: string;
    level: number;
    stars: number;
    money: number;
    burnedFields: number;
}): Promise<IScores> {
    const filter = { username: request.username, level: request.level };
    const update = { stars: request.stars, money: request.money, burnedFields: request.burnedFields };

    const scores = await GameModel.findOneAndUpdate(filter, update);

    return scores;
}

async function userCheck(username: string, level: number): Promise<boolean> {
    if (
        (await GameModel.exists({
            username: username,
            level: level,
        })) === false
    ) {
        return false;
    } else {
        return true;
    }
}

export { findScoreById, deleteScoreById, createScore, updateScore, userCheck };
