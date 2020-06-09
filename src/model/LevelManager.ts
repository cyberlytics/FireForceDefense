/**
 * @pattern Singleton (GoF:127)
 */
import type LevelDefinition from './LevelDefinition';
import lvl001 from '../levels/lvl001';
import User from './User';
import Score from './Score';
import lvl002 from '../levels/lvl002';

export default class LevelManager {

    private static instance: LevelManager;
    private levels: LevelDefinition[] = [];
    private levelIdToIndex: { [id: string]: number } = {};
    private user: User;

    private constructor() {
        this.registerLevel(lvl001);
        this.registerLevel(lvl002);
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
        const scores = this.user.getScores();
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

        return levelIdsWithScore;
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
}
