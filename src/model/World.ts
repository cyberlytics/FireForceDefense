import LevelManager from './LevelManager';
import User from './User';

export default class World {
    private levelManager: LevelManager;

    constructor() {
        this.levelManager = LevelManager.getInstance();
    }

    public getLevelData() {
        return this.levelManager.getLevelIdsWithScore();
    }

    public leaveWorld() {
        const user = User.getInstance();
        user.logout();
    }
}
