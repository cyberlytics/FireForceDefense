import type ContentCategory from './ContentCategory';
import type Cell from './Cell';
import Fire from './Fire';
import type FireIntensity from './FireIntensity';
import type Explainable from './Explainable';

export default abstract class Content implements Explainable {
    static readonly DAMAGE_MAX_LOW = 20;
    static readonly DAMAGE_MAX_MEDIUM = 40;
    static readonly DAMAGE_MAX_HIGH = 70;

    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly contentCategory: ContentCategory;
    abstract readonly damageMax: number;
    abstract readonly fireGrowChance: number;
    abstract readonly fireGrowAmount: number;
    abstract readonly buildCosts: number | null; // null means not buildable
    abstract readonly removeCosts: number | null; // null means not removable
    abstract readonly extinguishRange: number;
    abstract readonly extinguishRate: number;
    abstract readonly extinguishChance: number;

    damage = 0;

    abstract isPlaceableOn(cell: Cell): boolean;

    public applyDamage(fireIntensity: FireIntensity): boolean {
        this.damage += Fire.intensityToDamage(fireIntensity);
        return this.damage >= this.damageMax;
    }
}
