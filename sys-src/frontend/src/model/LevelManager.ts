/**
 * @pattern Singleton (GoF:127)
 */
import type LevelDefinition from './LevelDefinition';
import User from './User';
import Score from './Score';
import lvl001 from '@levels/lvl001';
import lvl002 from '@levels/lvl002';
import lvl003 from '@levels/lvl003';
import lvl004 from '@levels/lvl004';

export default class LevelManager {
    private static instance: LevelManager;
    private levels: LevelDefinition[] = [];
    private levelIdToIndex: { [id: string]: number } = {};
    private user: User;
    private _levelIdsWithScore: { levelID: string; score: Score }[] = [];

    get levelIdsWithScore(): { levelID: string; score: Score }[] {
        this.getLevelIdsWithScore();
        return this._levelIdsWithScore;
    }

    private constructor() {
        this.registerLevel(lvl001);
        this.registerLevel(lvl002);
        this.registerLevel(lvl003);
        this.registerLevel(lvl004);
        this.user = User.getInstance();
    }

    public static getInstance(): LevelManager {
        if (!LevelManager.instance) {
            LevelManager.instance = new LevelManager();
        }
        return LevelManager.instance;
    }

    public getAllLevels(): LevelDefinition[] {
        return this.levels;
    }

    public getLevelIdsWithScore(ready: () => void = () => {}): void {
        this.user.getScores((scores) => {
            const levelIdsWithScore: { levelID: string; score: Score }[] = [];
            this.levels.forEach((levelDef) => {
                levelIdsWithScore.push({
                    levelID: levelDef.levelID,
                    score: Object.prototype.hasOwnProperty.call(scores, levelDef.levelID)
                        ? scores[levelDef.levelID]
                        : Score.LOCKED,
                });
            });

            const firstLockedIndex = levelIdsWithScore.findIndex((element) => element.score === Score.LOCKED);
            if (firstLockedIndex !== -1) {
                levelIdsWithScore[firstLockedIndex].score = Score.UNLOCKED;
            }
            this._levelIdsWithScore = levelIdsWithScore;
            ready();
        });
    }

    public postScore(levelID: string, score: Score, money: number, time: number, burnedCells: number): void {
        if (Object.prototype.hasOwnProperty.call(this.levelIdToIndex, levelID)) {
            User.getInstance().postScore(levelID, score, money, time, burnedCells);
        }
    }

    public getLevelDefinition(levelID: string): LevelDefinition | null {
        if (!Object.prototype.hasOwnProperty.call(this.levelIdToIndex, levelID)) {
            return null;
        }
        return this.levels[this.levelIdToIndex[levelID]];
    }

    private registerLevel(def: LevelDefinition) {
        const id = def.levelID;
        if (Object.prototype.hasOwnProperty.call(this.levelIdToIndex, id)) {
            // Level already registered; return without adding it again.
            return;
        }
        this.levels.push(def);
        this.levelIdToIndex[id] = this.levels.indexOf(def);
    }

    public getNextLevel(currentLevel: LevelDefinition): LevelDefinition | null {
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
