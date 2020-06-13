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
import Abgebrannt from '../cells/Abgebrannt';
import type Content from './Content';
import Brandreste from '../contents/Brandreste';
import Fire from './Fire';

export default class Game {
    private levelDefinition: LevelDefinition;
    private readonly levelMap: LevelMap;

    private _contentToBuild: ContentDerivedType = null;
    private _isBaseBuilt = false;

    private get isBaseBuilt() {
        return this._isBaseBuilt;
    }

    private set isBaseBuilt(value) {
        if (!this._isBaseBuilt && value) {
            this.start();
        } else if (this._isBaseBuilt && !value) {
            // This could be used to rebuild the base after it was removed in some non-level-ending way.
            // As of now, no such use case exists.
            // This is mainly implemented as a symmetrical counterpart to the if-statement above.
            this.pause();
            this.contentToBuild = Basis;
        }
        this._isBaseBuilt = value;
    }

    // How long a game step should last in milliseconds
    private gameStepDuration = 1000;

    // Milliseconds since 1970-01-01 at the time the current game step timeout was started
    private gameStepTimeoutStart: number|null = null;

    // Remaining time for the game step timeout
    private gameStepRemainingTime: number|null = null;

    // ID for the game step timeout as returned by setTimeout
    private gameStepTimeoutID: number|null = null;

    // Number of fully executed game steps
    private gameStepCounter = 0;

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
            this.placeContentAt(new contentDefinition.contentType(), contentDefinition.pos);
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
        if (this.placeContentAt(new this.contentToBuild(), position)) {
            // TODO Remove build costs from money here
            return true;
        }
        return false;
    }

    private placeContentAt(content: Content, position: HexPosition): boolean {
        const cell = this.levelMap.getCellAt(position);
        if (cell.content !== null) {
            return false;
        }
        if (content.isPlaceableOn(cell)) {
            if (content.id === 'Basis') {
                this.isBaseBuilt = true;
            }
            cell.content = content;
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

    private fireDamage() {
        this.levelMap.getAllCells().forEach((cell) => {
            if (cell.content && cell.content.applyDamage(cell.fireIntensity)) {
                cell.content = new Brandreste();
            }
            if (cell.applyDamage()) {
                const content = cell.content;
                const intensity = cell.fireIntensity;
                const burnt = new Abgebrannt(cell.position);
                this.levelMap.replaceCell(burnt);
                this.levelMap.getCellAt(cell.position).fireIntensity = intensity;
                if (content) {
                    this.placeContentAt(content, cell.position);
                }
            }
        });
    }

    private ownFireChange() {
        this.levelMap.getAllCells().forEach((cell) => {
            cell.fireIntensity = Fire.modify(cell.fireIntensity, cell.fireGrowAmount, cell.maxFireIntensity, true);
        });
    }

    private step() {
        this.fireDamage();

        // TODO Check if the base still exists and end the level if not

        // TODO Calculate fire spread to neighbor cells

        // TODO Apply fire spread to neighbor cells

        // TODO Reduce fire intensity according to the fire extinguishing contents

        this.ownFireChange();

        // TODO Check if there are still fires burning and end the level if not

        // TODO Execute effects
    }

    private timeoutHandler() {
        this.start();
        this.step();
        this.gameStepCounter++;
    }

    public start() {
        this.gameStepTimeoutID = window.setTimeout(
            () => this.timeoutHandler(),
            this.gameStepRemainingTime === null ? this.gameStepDuration : this.gameStepRemainingTime
        );
        this.gameStepTimeoutStart = Date.now();
        this.gameStepRemainingTime = null;
    }

    public pause() {
        window.clearTimeout(this.gameStepTimeoutID);
        this.gameStepRemainingTime = this.gameStepDuration + this.gameStepTimeoutStart - Date.now();
        this.gameStepTimeoutID = null;
        this.gameStepTimeoutStart = null;
    }
}
