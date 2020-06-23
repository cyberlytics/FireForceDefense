import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';
import type Cell from '../model/Cell';

export default class Loeschzeppelin extends Content {
    readonly description = 'Fire-fighting zeppelin: A mighty aircraft with big cisterns, which keeps fire at bay with ease.';
    readonly name = 'Loeschzeppelin';
    readonly id = 'Loeschzeppelin';
    readonly buildCosts: number = 150;
    readonly damageMax = Content.DAMAGE_MAX_LOW;
    readonly fireGrowChance = 1;
    readonly fireGrowAmount = 10;
    readonly removeCosts: number = -90;
    readonly extinguishRange = 2;
    readonly extinguishRate = 2;
    readonly extinguishChance = 0.5;
    readonly contentCategory = ContentCategory.CONTENT_EXTINGUISHER;

    isPlaceableOn(cell: Cell): boolean {
        return cell.groups.includes('land');
    }
}
