import { GameModel } from '../models/Scores';
import type IScores from '../types/Scores';

interface UserScores {
    _id: string;
    username: string;
    scores: {
        [level: string]: number;
    };
}

interface ScoreboardEntry {
    username: string;
    stars: number;
    burnedFields: number;
    time: number;
    money: number;
}

async function findScoresByUsername(username: string): Promise<UserScores[]> {
    const scores = await GameModel.aggregate([
        {
            $match: { username },
        },
        {
            $group: {
                _id: '$username',
                scores: {
                    $push: { v: '$stars', k: '$level' },
                },
            },
        },
        {
            $project: {
                username: '$_id',
                scores: { $arrayToObject: '$scores' },
            },
        },
    ]).exec();

    if (scores == null) {
        throw 'No data found!';
    }
    return scores;
}

// Create a new score and save it to database
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

// Update an existing score in database
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

    return GameModel.findOneAndUpdate(filter, update);
}

// Checks if the user exists
async function userCheck(username: string, level: string): Promise<boolean> {
    return (
        (await GameModel.exists({
            username: username,
            level: level,
        })) !== false
    );
}

// Returns the data of a specific level
async function findScoresByLevel(level: string): Promise<ScoreboardEntry[]> {
    const pipeline: unknown[] = [
        {
            $group: {
                _id: '$username',
                username: { $first: '$username' },
                stars: { $sum: '$stars' },
                time: { $avg: '$time' },
                money: { $avg: '$money' },
                burnedFields: { $avg: '$burnedFields' },
            },
        },
        {
            $sort: {
                stars: -1,
                burnedFields: 1,
                money: -1,
                time: 1,
            },
        },
    ];
    if (level != null) {
        pipeline.unshift({
            $match: { level },
        });
    }
    return GameModel.aggregate(pipeline).exec();
}

export { findScoresByUsername, createScore, updateScore, userCheck, findScoresByLevel };
