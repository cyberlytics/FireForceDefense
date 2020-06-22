import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';
import type Cell from '../model/Cell';
import HexPosition from '../model/HexPosition';

export default class Basis extends Content {
    readonly description = 'Basis: The main building which must be protected at all cost. The coordination of the fire fighting is organized here.';
    readonly name = 'Basis';
    readonly id = 'Basis';
    readonly buildCosts = 0;
    readonly damageMax = Content.DAMAGE_MAX_MEDIUM;
    readonly fireGrowChance = 0.7;
    readonly fireGrowAmount = 1;
    readonly removeCosts: number = null;
    readonly extinguishRange = 0;
    readonly extinguishRate = 0;
    readonly extinguishChance = 0;
    readonly contentCategory = ContentCategory.CONTENT_PROTECTION_GOAL;

    isPlaceableOn(cell: Cell): boolean {
        return cell.groups.includes('land') && HexPosition.getDistance(cell.position, new HexPosition(0, 0)) <= 1;
    }
}
