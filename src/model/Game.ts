import LevelManager from './LevelManager';
import type LevelDefinition from './LevelDefinition';
import Map from './Map';

export default class Game {
    private levelDefinition: LevelDefinition;
    private map: Map;

    constructor(levelID: string) {
        const lm = LevelManager.getInstance();
        const ld = lm.getLevelDefinition(levelID);
        if (!ld) {
            throw new Error('Level not registered!');
        }
        this.levelDefinition = ld;
        // TODO fetch user score and check if level is unlocked
        this.map = new Map(this.levelDefinition.cellDefinitions);
    }
}
