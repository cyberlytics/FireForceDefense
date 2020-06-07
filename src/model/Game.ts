import LevelManager from './LevelManager';
import type LevelDefinition from './LevelDefinition';
import LevelMap from './LevelMap';
import Drehleiter from '../contents/Drehleiter';
import Hydroschild from '../contents/Hydroschild';
import Loeschpanzer from '../contents/Loeschpanzer';
import Loeschschiff from '../contents/Loeschschiff';
import Loeschtrupp from '../contents/Loeschtrupp';
import type Cell from './Cell';
import type ContentDerivedType from './ContentDerivedType';
import type HexPosition from './HexPosition';

export default class Game {
    private levelDefinition: LevelDefinition;
    private levelMap: LevelMap;

    private _contentToBuild: ContentDerivedType = null;

    get contentToBuild() {
        return this._contentToBuild;
    }

    set contentToBuild(value) {
        this._contentToBuild = value;
        this.markDisabledCells();
    }

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

    public getLevelMap() {
        return this.levelMap;
    }

    public placeAt(position: HexPosition): boolean {
        if (this.contentToBuild === null) {
            return false;
        }
        const content = new (this.contentToBuild)();
        if (content.isPlaceableOn(this.levelMap.getCellAt(position))) {
            // TODO Place content on cell
        } else {
            return false;
        }
    }

    private markDisabledCells() {
        let func = (cell: Cell) => true;
        if (this.contentToBuild !== null) {
            func = new (this.contentToBuild)().isPlaceableOn;
        }
        this.levelMap.getAllCells().forEach((cell: Cell) => {
            cell.disabled = !func(cell);
        });
    }
}
