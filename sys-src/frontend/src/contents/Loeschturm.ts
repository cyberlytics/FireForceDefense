import Content from '@model/Content';
import ContentCategory from '@model/ContentCategory';
import type Cell from '@model/Cell';

export default class Loeschturm extends Content {
    readonly description =
        'Fire-fighting tower: A big tower with a built-in water pump and a raised fire extinguishing range.';
    readonly name = 'Loeschturm';
    readonly id = 'Loeschturm';
    readonly buildCosts: number = 25;
    readonly damageMax = Content.DAMAGE_MAX_LOW;
    readonly fireGrowChance = 0;
    readonly fireGrowAmount = 0;
    readonly removeCosts: number = -15;
    readonly extinguishRange = 2;
    readonly extinguishRate = 1;
    readonly extinguishChance = 0.5;
    readonly contentCategory = ContentCategory.CONTENT_EXTINGUISHER;

    isPlaceableOn(cell: Cell): boolean {
        return cell.groups.includes('land');
    }
}
