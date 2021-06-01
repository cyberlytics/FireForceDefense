import Content from '@model/Content';
import ContentCategory from '@model/ContentCategory';
import type Cell from '@model/Cell';

export default class Loeschschiff extends Content {
    readonly description =
        'Fire-fighting ship: A big ship keeps the surrounded domain save from fire with its infinity water supply.';
    readonly name = 'Loeschschiff';
    readonly id = 'Loeschschiff';
    readonly buildCosts: number = 100;
    readonly damageMax = Content.DAMAGE_MAX_HIGH;
    readonly fireGrowChance = 0;
    readonly fireGrowAmount = 0;
    readonly removeCosts: number = -50;
    readonly extinguishRange = 2;
    readonly extinguishRate = 2;
    readonly extinguishChance = 0.5;
    readonly contentCategory = ContentCategory.CONTENT_EXTINGUISHER;

    isPlaceableOn(cell: Cell): boolean {
        return cell.groups.includes('water');
    }
}
