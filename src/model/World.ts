import LevelManager from './LevelManager';
import User from './User';

export default class World {
    private levelManager: LevelManager;

    constructor() {
        this.levelManager = LevelManager.getInstance();
    }
}
