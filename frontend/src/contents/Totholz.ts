import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';
import type Cell from '../model/Cell';

export default class Totholz extends Content {
    readonly description = 'Deadwood: Dead and dried trees, which burn very easily and very long.';
    readonly name = 'Totholz';
    readonly id = 'Totholz';
    readonly buildCosts: null = null;
    readonly damageMax = Content.DAMAGE_MAX_HIGH;
    readonly fireGrowChance = 0.8;
    readonly fireGrowAmount = 3;
    readonly removeCosts: number = 10;
    readonly extinguishRange = 0;
    readonly extinguishRate = 0;
    readonly extinguishChance = 0;
    readonly contentCategory = ContentCategory.CONTENT_NATURE;

    isPlaceableOn(cell: Cell): boolean {
        return cell.groups.includes('land');
    }
}
