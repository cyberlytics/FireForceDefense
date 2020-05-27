import type ContentCategory from './ContentCategory';

export default abstract class Content {
    static readonly DAMAGE_MAX_LOW = 20;
    static readonly DAMAGE_MAX_MEDIUM = 40;
    static readonly DAMAGE_MAX_HIGH = 70;

    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly contentCategory: ContentCategory;
    abstract readonly damageMax: number;
    abstract readonly buildCosts: number|null; // null means not buildable
    abstract readonly removeCosts: number|null; // null means not removable
    abstract readonly extinguishRange: number;
    abstract readonly extinguishRate: number;

    damage = 0;
}
