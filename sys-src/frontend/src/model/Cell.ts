import FireIntensity from './FireIntensity';
import type Content from './Content';
import type HexPosition from './HexPosition';
import Fire from './Fire';
import type Explainable from './Explainable';

export default abstract class Cell implements Explainable {
    static readonly DAMAGE_MAX_LOW = 20;
    static readonly DAMAGE_MAX_MEDIUM = 40;
    static readonly DAMAGE_MAX_HIGH = 70;

    static readonly MAX_FIRE_INTENSITY_LOW = FireIntensity.INTENSITY_5;
    static readonly MAX_FIRE_INTENSITY_MEDIUM = FireIntensity.INTENSITY_9;
    static readonly MAX_FIRE_INTENSITY_HIGH = FireIntensity.INTENSITY_12;

    static readonly SPREAD_AMOUNT_LOW = 1;
    static readonly SPREAD_AMOUNT_MEDIUM = 2;
    static readonly SPREAD_AMOUNT_HIGH = 3;

    static readonly IGNITION_CHANCE_LOW = 0.05;
    static readonly IGNITION_CHANCE_MEDIUM = 0.15;
    static readonly IGNITION_CHANCE_HIGH = 0.3;

    static readonly IGNITION_THRESHOLD_LOW = FireIntensity.INTENSITY_2;
    static readonly IGNITION_THRESHOLD_MEDIUM = FireIntensity.INTENSITY_5;
    static readonly IGNITION_THRESHOLD_HIGH = FireIntensity.INTENSITY_8;

    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly damageMax: number;
    abstract readonly maxFireIntensity: FireIntensity;
    abstract readonly fireGrowChance: number;
    abstract readonly fireGrowAmount: number;
    abstract readonly spreadAmount: number;
    abstract readonly ignitionChance: number;
    abstract readonly ignitionThreshold: number;
    abstract readonly groups: string[];

    content: Content | null = null;
    damage = 0;
    fireIntensity: FireIntensity = FireIntensity.INTENSITY_0;
    neighborSpreadTmp: number;
    stepBeginIntensity: FireIntensity = FireIntensity.INTENSITY_0;
    readonly position: HexPosition;

    constructor(position: HexPosition) {
        this.position = position;
    }

    public applyDamage(): boolean {
        this.damage += Fire.intensityToDamage(this.fireIntensity);
        return this.damage >= this.damageMax;
    }
}
