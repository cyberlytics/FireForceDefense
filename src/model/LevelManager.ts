/**
 * @pattern Singleton (GoF:127)
 */
import type LevelDefinition from './LevelDefinition';
import lvl001 from '../levels/lvl001';
import User from './User';
import Score from './Score';
import lvl002 from '../levels/lvl002';
import lvl003 from '../levels/lvl003';

export default class LevelManager {

    private static instance: LevelManager;
    private levels: LevelDefinition[] = [];
    private levelIdToIndex: { [id: string]: number } = {};
    private user: User;
    private _levelIdsWithScore: { levelID: string, score: Score }[] = [];

    get levelIdsWithScore(): { levelID: string, score: Score }[] {
        this.getLevelIdsWithScore();
        return this._levelIdsWithScore;
    }

    private constructor() {
        this.registerLevel(lvl001);
        this.registerLevel(lvl002);
        this.registerLevel(lvl003);
        this.user = User.getInstance();
    }

    public static getInstance(): LevelManager {
        if (!LevelManager.instance) {
            LevelManager.instance = new LevelManager();
        }
        return LevelManager.instance;
    }

    public getAllLevels() {
        return this.levels;
    }

    public getLevelIdsWithScore() {
        this.user.getScores((scores) => {
            const levelIdsWithScore: { levelID: string, score: Score }[] = [];
            this.levels.forEach(levelDef => {
                levelIdsWithScore.push({
                    levelID: levelDef.levelID,
                    score: scores.hasOwnProperty(levelDef.levelID) ? scores[levelDef.levelID] : Score.LOCKED,
                });
            });

            const firstLockedIndex = levelIdsWithScore.findIndex((element) => element.score === Score.LOCKED);
            if (firstLockedIndex !== -1) {
                levelIdsWithScore[firstLockedIndex].score = Score.UNLOCKED;
            }
            this._levelIdsWithScore = levelIdsWithScore;
        });
    }

    public postScore(levelID: string, score: Score) {
        if (this.levelIdToIndex.hasOwnProperty(levelID)) {
            User.getInstance().postScore(levelID, score);
        }
    }

    public getLevelDefinition(levelID: string) {
        if (!this.levelIdToIndex.hasOwnProperty(levelID)) {
            return null;
        }
        return this.levels[this.levelIdToIndex[levelID]];
    }

    private registerLevel(def: LevelDefinition) {
        const id = def.levelID;
        if (this.levelIdToIndex.hasOwnProperty(id)) {
            // Level already registered; return without adding it again.
            return;
        }
        this.levels.push(def);
        this.levelIdToIndex[id] = this.levels.indexOf(def);
    }

    public getNextLevel(currentLevel: LevelDefinition): LevelDefinition|null {
        const index = this.levels.indexOf(currentLevel);
        if (index === -1) {
            // current level not found
            return null;
        }
        const nextLevel = this.levels[index + 1];

        // if no next level exists, return null
        return nextLevel ? nextLevel : null;
    }
}
