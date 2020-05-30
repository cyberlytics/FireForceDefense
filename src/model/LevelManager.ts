/**
 * @pattern Singleton (GoF:127)
 */
import type LevelDefinition from './LevelDefinition';
import lvl001 from '../levels/lvl001';
import User from './User';

export default class LevelManager {

    private constructor() {
        this.registerLevel(lvl001);
    }

    private static instance: LevelManager;
    private levels: LevelDefinition[] = [];
    private levelIdToIndex: { [id: string]: number } = {};
    private user: User;

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
        this.user = User.getInstance();
        return this.user.getScores();
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
