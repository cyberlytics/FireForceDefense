import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';
import type Cell from '../model/Cell';

export default class Loeschkran extends Content {
    readonly description = 'Loeschkran: Description';
    readonly name = 'Loeschkran';
    readonly id = 'Loeschkran';
    readonly buildCosts: number = 40;
    readonly damageMax = 1;
    readonly removeCosts: number = -20;
    readonly extinguishRange = 3;
    readonly extinguishRate = 2;
    readonly contentCategory = ContentCategory.CONTENT_EXTINGUISHER;

    isPlaceableOn(cell: Cell): boolean {
        return cell.groups.includes('land');
    }
}
