import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';
import type Cell from '../model/Cell';

export default class Loeschkran extends Content {
    readonly description = 'Loeschkran: An alienated cran, which gives a big contribution in the fight against a fire.';
    readonly name = 'Loeschkran';
    readonly id = 'Loeschkran';
    readonly buildCosts: number = 40;
    readonly damageMax = 1;
    readonly fireGrowChance = 0.5;
    readonly fireGrowAmount = 1;
    readonly removeCosts: number = -20;
    readonly extinguishRange = 3;
    readonly extinguishRate = 2;
    readonly extinguishChance = 0.5;
    readonly contentCategory = ContentCategory.CONTENT_EXTINGUISHER;

    isPlaceableOn(cell: Cell): boolean {
        return cell.groups.includes('land');
    }
}
