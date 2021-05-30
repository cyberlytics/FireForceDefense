/**
 * @pattern Singleton (GoF:127)
 */
import LevelManager from './LevelManager';
import User from './User';
import type Score from './Score';

export default class World {
    private static instance: World;
    private levelManager: LevelManager;

    private constructor() {
        this.levelManager = LevelManager.getInstance();
    }

    public static getInstance(): World {
        if (!World.instance) {
            World.instance = new World();
        }
        return World.instance;
    }

    public getLevelData(): { levelID: string; score: Score }[] {
        return this.levelManager.levelIdsWithScore;
    }

    public leaveWorld(): void {
        const user = User.getInstance();
        user.logout();
    }
}
