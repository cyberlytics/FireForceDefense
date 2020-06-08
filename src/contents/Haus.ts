import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';
import type Cell from '../model/Cell';

export default class Haus extends Content {
    readonly description = 'Haus: Description';
    readonly name = 'Haus';
    readonly id = 'Haus';
    readonly buildCosts: null = null;
    readonly damageMax = Content.DAMAGE_MAX_MEDIUM;
    readonly removeCosts: number = null;
    readonly extinguishRange = 0;
    readonly extinguishRate = 0;
    readonly contentCategory = ContentCategory.CONTENT_PROTECTION_GOAL;

    isPlaceableOn(cell: Cell): boolean {
        return cell.groups.includes('land');
    }
}
