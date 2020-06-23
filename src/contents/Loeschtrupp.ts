import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';
import type Cell from '../model/Cell';

export default class Loeschtrupp extends Content {
    readonly description = 'Firefighters: A troop of common people, who breast the fire out of hardship.';
    readonly name = 'Loeschtrupp';
    readonly id = 'Loeschtrupp';
    readonly buildCosts: number = 10;
    readonly damageMax = Content.DAMAGE_MAX_LOW;
    readonly fireGrowChance = 0.9;
    readonly fireGrowAmount = -1;
    readonly removeCosts: number = -5;
    readonly extinguishRange = 1;
    readonly extinguishRate = 1;
    readonly extinguishChance = 0.5;
    readonly contentCategory = ContentCategory.CONTENT_EXTINGUISHER;

    isPlaceableOn(cell: Cell): boolean {
        return cell.groups.includes('land');
    }
}
