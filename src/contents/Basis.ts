import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';
import type Cell from '../model/Cell';
import HexPosition from '../model/HexPosition';

export default class Basis extends Content {
    readonly description = 'Basis: Description';
    readonly name = 'Basis';
    readonly id = 'Basis';
    readonly buildCosts: null = null;
    readonly damageMax = Content.DAMAGE_MAX_MEDIUM;
    readonly removeCosts: number = null;
    readonly extinguishRange = 0;
    readonly extinguishRate = 0;
    readonly contentCategory = ContentCategory.CONTENT_PROTECTION_GOAL;

    isPlaceableOn(cell: Cell): boolean {
        return cell.groups.includes('land') && HexPosition.getDistance(cell.position, new HexPosition(0, 0)) <= 1;
    }
}
