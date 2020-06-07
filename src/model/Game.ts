import LevelManager from './LevelManager';
import type LevelDefinition from './LevelDefinition';
import LevelMap from './LevelMap';
import Drehleiter from '../contents/Drehleiter';
import Hydroschild from '../contents/Hydroschild';
import Loeschpanzer from '../contents/Loeschpanzer';
import Loeschschiff from '../contents/Loeschschiff';
import Loeschtrupp from '../contents/Loeschtrupp';
import type Content from './Content';

export default class Game {
    private levelDefinition: LevelDefinition;
    private levelMap: LevelMap;

    public contentToBuild: Content = null;

    constructor(levelID: string) {
        const lm = LevelManager.getInstance();
        const ld = lm.getLevelDefinition(levelID);
        if (!ld) {
            throw new Error('Level not registered!');
        }
        this.levelDefinition = ld;
        // TODO fetch user score and check if level is unlocked
        this.levelMap = new LevelMap(this.levelDefinition.cellDefinitions);
    }

    public static getBuildableContents() {
        return [
            Drehleiter,
            Hydroschild,
            Loeschpanzer,
            Loeschschiff,
            Loeschtrupp,
        ];
    }

    getLevelMap() {
        return this.levelMap;
    }
}
