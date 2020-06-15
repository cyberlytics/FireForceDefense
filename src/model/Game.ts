import type LevelDefinition from './LevelDefinition';
import type Cell from './Cell';
import type ContentDerivedType from './ContentDerivedType';
import type ContentDefinition from './ContentDefinition';
import type EffectDefinition from './EffectDefinition';
import type Content from './Content';
import LevelManager from './LevelManager';
import LevelMap from './LevelMap';
import HexPosition from './HexPosition';
import Basis from '../contents/Basis';
import Loeschkran from '../contents/Loeschkran';
import Loeschturm from '../contents/Loeschturm';
import Loeschzeppelin from '../contents/Loeschzeppelin';
import Loeschschiff from '../contents/Loeschschiff';
import Loeschtrupp from '../contents/Loeschtrupp';
import Abgebrannt from '../cells/Abgebrannt';
import Brandreste from '../contents/Brandreste';
import Fire from './Fire';
import FireIntensity from './FireIntensity';
import Regen from '../effects/Regen';

export default class Game {

    private levelDefinition: LevelDefinition;
    private effectDefinitions: EffectDefinition[];
    private readonly levelMap: LevelMap;

    private _contentToBuild: ContentDerivedType = null;
    private _removeMode = false;
    private _isBaseBuilt = false;

    private gameStepDuration = 1000;                   // How long a game step should last in milliseconds
    private gameStepTimeoutStart: number|null = null;  // Start time of current game step timeout
    private gameStepRemainingTime: number|null = null; // Remaining time for the game step timeout
    private gameStepTimeoutID: number|null = null;     // ID for the game step timeout as returned by setTimeout
    private gameStepCounter = 0;                       // Number of fully executed game steps

    private _reliefGotActivated = false;

    constructor(levelID: string) {
        const levelManager = LevelManager.getInstance();
        const levelDefinition = levelManager.getLevelDefinition(levelID);

        if (!levelDefinition) {
            throw new Error('Level not registered!');
        }
        this.levelDefinition = levelDefinition;
        this.effectDefinitions = levelDefinition.effectDefinitions;
        // TODO fetch user score and check if level is unlocked
        this.levelMap = new LevelMap(this.levelDefinition.cellDefinitions);

        levelDefinition.contentDefinitions.forEach((contentDefinition: ContentDefinition) => {
            this.placeContentAt(new contentDefinition.contentType(), contentDefinition.pos);
        });

        if (!this.isBaseBuilt) {
            this.contentToBuild = Basis;
        }
    }

    /* Public methods */
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

    public getCellDisabledFunction() {
        return this._isCellDisabled;
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

    public enterRemoveMode() {
        if (!this.isBaseBuilt) {
            return;
        }
        this._removeMode = true;
        this.contentToBuild = null;
        this.markDisabledCells();
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

    public leaveRemoveMode() {
        this._removeMode = false;
        this.markDisabledCells();
    }

    public removeAt(position: HexPosition) {
        if (!this.removeMode) {
            return;
        }
        const cell = this.levelMap.getCellAt(position);
        if (!this.isRemovable(cell)) {
            return;
        }
        cell.content = null;
        // TODO Apply remove costs here
    }

    public emergencyRelief() {
        if (!this.reliefGotActivated) {
            const regen = new Regen();
            regen.applyEffect(this.levelMap, new HexPosition(0, 0));
            this._reliefGotActivated = true;
        }
    }

    /* Getter and Setter */
    get reliefGotActivated() {
        return this._reliefGotActivated;
    }

    get removeMode() {
        return this._removeMode;
    }

    get contentToBuild() {
        return this._contentToBuild;
    }

    set contentToBuild(value) {
        if (value !== null) {
            this.leaveRemoveMode();
        }
        if (!this.isBaseBuilt && value !== Basis) {
            return;
        }
        this._contentToBuild = value;
        this.markDisabledCells();
    }

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

    /* Private methods */
    private isRemovable(cell: Cell) {
        // TODO Add check if there is enough money to remove the content
        return cell.content !== null && cell.content.removeCosts !== null;
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

    private _isCellDisabled: (cell: Cell) => boolean = () => false;

    private markDisabledCells() {
        let func = (cell: Cell) => false;
        if (this.contentToBuild !== null) {
            func = (cell: Cell) => !new (this.contentToBuild)().isPlaceableOn(cell) || cell.content !== null;
        } else if (this.removeMode) {
            func = (cell) => !this.isRemovable(cell);
        }
        this._isCellDisabled = func;
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

    private calculateNeighborSpread() {
        this.levelMap.getAllCells().forEach((cell) => {
            if (cell.fireIntensity === FireIntensity.INTENSITY_0) {
                return;
            }
            this.levelMap.getCellsAround(cell.position, 1).forEach((neighbor) => {
                if (
                    cell.fireIntensity >= neighbor.ignitionThreshold
                    && Math.random() < cell.ignitionChance
                ) {
                    neighbor.neighborSpreadTmp += Math.min(cell.fireIntensity, cell.spreadAmount);
                }
            });
        });
    }

    private applyNeighborSpread() {
        this.levelMap.getAllCells().forEach((cell) => {
            cell.fireIntensity = Fire.modify(cell.fireIntensity, cell.neighborSpreadTmp, cell.maxFireIntensity);
            cell.neighborSpreadTmp = 0;
        });
    }

    private extinguish() {
        this.levelMap.getAllCells().forEach((cell) => {
            if (!cell.content) {
                return;
            }
            const rate = -cell.content.extinguishRate;
            this.levelMap.getCellsAround(cell.position, cell.content.extinguishRange).forEach((target) => {
                if (target.fireIntensity === FireIntensity.INTENSITY_0) {
                    return;
                }
                target.fireIntensity = Fire.modify(target.fireIntensity, rate);
            });
        });
    }

    private step() {
        this.fireDamage();

        // TODO Check if the base still exists and end the level if not

        this.calculateNeighborSpread();

        this.applyNeighborSpread();

        this.extinguish();

        this.ownFireChange();

        // TODO Check if there are still fires burning and end the level if not

        this.executeEffects();
    }

    private timeoutHandler() {
        this.start();
        this.step();
        this.gameStepCounter++;
    }

    private executeEffects() {
        this.effectDefinitions.forEach(effectDefinition => {
            if (effectDefinition.mustBeExecuted(this.gameStepCounter)) {
                const effect = new effectDefinition.effectType();
                effect.applyEffect(this.levelMap, effectDefinition.pos);
            }
        });
    }
}
