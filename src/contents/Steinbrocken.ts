import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';
import type Cell from '../model/Cell';

export default class Steinbrocken extends Content {
    readonly description = 'Steinbrocken: Description';
    readonly name = 'Steinbrocken';
    readonly id = 'Steinbrocken';
    readonly buildCosts: null = null;
    readonly damageMax = +Infinity;
    readonly fireGrowChance = 0;
    readonly fireGrowAmount = 0;
    readonly removeCosts: null = null;
    readonly extinguishRange = 0;
    readonly extinguishRate = 0;
    readonly extinguishChance = 0;
    readonly contentCategory = ContentCategory.CONTENT_NATURE;

    isPlaceableOn(cell: Cell): boolean {
        return cell.groups.includes('land');
    }
}
