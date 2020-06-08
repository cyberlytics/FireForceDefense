/**
 * @pattern Singleton (GoF:127)
 */
import LevelManager from './LevelManager';
import User from './User';

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

    public getLevelData() {
        return this.levelManager.getLevelIdsWithScore();
    }

    public leaveWorld() {
        const user = User.getInstance();
        user.logout();
    }
}
