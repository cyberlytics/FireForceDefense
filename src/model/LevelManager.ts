/**
 * @pattern Singleton (GoF:127)
 */
import type LevelDefinition from './LevelDefinition';
import lvl001 from '../levels/lvl001';
import User from './User';
import Score from './Score';

export default class LevelManager {

    private static instance: LevelManager;
    private levels: LevelDefinition[] = [];
    private levelIdToIndex: { [id: string]: number } = {};
    private user: User;

    private constructor() {
        this.registerLevel(lvl001);
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
        const levelIdsWithScore: { [x: string]: Score } = {};
        this.levels.forEach(levelDef => {
            if (scores.hasOwnProperty(levelDef.levelID)) {
                levelIdsWithScore[levelDef.levelID] = scores[levelDef.levelID];
            } else {
                levelIdsWithScore[levelDef.levelID] = Score.LOCKED;
            }
        });

        for (const [key, value] of Object.entries(levelIdsWithScore)) {
            if (value === Score.LOCKED) {
                levelIdsWithScore[key] = Score.UNLOCKED;
            }
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
