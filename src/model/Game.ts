import LevelManager from './LevelManager';
import type LevelDefinition from './LevelDefinition';
import LevelMap from './LevelMap';
import Loeschkran from '../contents/Loeschkran';
import Loeschturm from '../contents/Loeschturm';
import Loeschzeppelin from '../contents/Loeschzeppelin';
import Loeschschiff from '../contents/Loeschschiff';
import Loeschtrupp from '../contents/Loeschtrupp';
import type Cell from './Cell';
import type ContentDerivedType from './ContentDerivedType';
import type HexPosition from './HexPosition';
import type ContentDefinition from './ContentDefinition';
import Basis from '../contents/Basis';

export default class Game {
    private levelDefinition: LevelDefinition;
    private levelMap: LevelMap;

    private _contentToBuild: ContentDerivedType = null;
    private isBaseBuilt = false;

    get contentToBuild() {
        return this._contentToBuild;
    }

    set contentToBuild(value) {
        if (!this.isBaseBuilt && value !== Basis) {
            return;
        }
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

        if (!this.isBaseBuilt) {
            this.contentToBuild = Basis;
        }
    }

    public static getBuildableContents() {
        return [
            Loeschkran,
            Loeschturm,
            Loeschzeppelin,
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
            if (content === Basis) {
                this.isBaseBuilt = true;
            }
            cell.content = contentInstance;
        } else {
            return false;
        }
    }

    private markDisabledCells() {
        let func = (cell: Cell) => false;
        if (this.contentToBuild !== null) {
            func = (cell: Cell) => !new (this.contentToBuild)().isPlaceableOn(cell) || cell.content !== null;
        }
        this._isCellDisabled = func;
    }

    private _isCellDisabled: (cell: Cell) => boolean = () => false;

    public getCellDisabledFunction() {
        return this._isCellDisabled;
    }
}
