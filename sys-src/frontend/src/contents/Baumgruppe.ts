import Content from '@model/Content';
import ContentCategory from '@model/ContentCategory';
import type Cell from '@model/Cell';

export default class Baumgruppe extends Content {
    readonly description =
        'Grove: Inherits strong and resilient trees, which hold back fire better, but also let the fire burn longer.';
    readonly name = 'Baumgruppe';
    readonly id = 'Baumgruppe';
    readonly buildCosts: null = null;
    readonly damageMax = Content.DAMAGE_MAX_MEDIUM;
    readonly fireGrowChance = 0.7;
    readonly fireGrowAmount = 2;
    readonly removeCosts: number = 5;
    readonly extinguishRange = 0;
    readonly extinguishRate = 0;
    readonly extinguishChance = 0;
    readonly contentCategory = ContentCategory.CONTENT_NATURE;

    isPlaceableOn(cell: Cell): boolean {
        return cell.groups.includes('land');
    }
}
