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
import type ContentDefinition from './ContentDefinition';

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

        ld.contentDefinitions.forEach((contentDefinition: ContentDefinition) => {
            this.placeContentAt(contentDefinition.contentType, contentDefinition.pos);
        });
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
        if (this.placeContentAt(this.contentToBuild, position)) {
            // TODO Remove build costs from money here
            return true;
        }
        return false;
    }

    private placeContentAt(content: ContentDerivedType, position: HexPosition): boolean {
        const contentInstance = new content();
        const cell = this.levelMap.getCellAt(position);
        if (cell.content !== null) {
            return false;
        }
        if (contentInstance.isPlaceableOn(cell)) {
            cell.content = contentInstance;
        } else {
            return false;
        }
    }

    private markDisabledCells() {
        let func = (cell: Cell) => true;
        if (this.contentToBuild !== null) {
            func = (cell: Cell) => new (this.contentToBuild)().isPlaceableOn(cell) && cell.content === null;
        }
        this.levelMap.getAllCells().forEach((cell: Cell) => {
            cell.disabled = !func(cell);
        });
    }
}
