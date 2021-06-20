import { GameModel } from '../models/Scores';
import type IScores from '../types/Scores';

async function findScores(name: string): Promise<IScores[]> {
    const scores = await GameModel.find({ username: name }).exec();
    if (scores == null) {
        throw 'No data found!';
    }
    return Promise.resolve(scores);
}

async function createScore(request: {
    username: string;
    level: string;
    stars: number;
    money: number;
    burnedFields: number;
    time: number;
}): Promise<IScores> {
    const scores = new GameModel(request);
    await scores.save();

    return scores;
}

async function updateScore(request: {
    username: string;
    level: string;
    stars: number;
    money: number;
    burnedFields: number;
    time: number;
}): Promise<IScores> {
    const filter = { username: request.username, level: request.level };
    const update = {
        stars: request.stars,
        money: request.money,
        burnedFields: request.burnedFields,
        time: request.time,
    };

    const scores = await GameModel.findOneAndUpdate(filter, update);

    return scores;
}

async function userCheck(username: string, level: string): Promise<boolean> {
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

export { findScores, createScore, updateScore, userCheck };
