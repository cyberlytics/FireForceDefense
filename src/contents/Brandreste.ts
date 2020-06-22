import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';
import type Cell from '../model/Cell';

export default class Brandreste extends Content {
    readonly description = 'Brandreste: The remains after a burn let merely guess the splendor for former nature and civilization.';
    readonly name = 'Brandreste';
    readonly id = 'Brandreste';
    readonly buildCosts: null = null;
    readonly damageMax = +Infinity;
    readonly fireGrowChance = 0;
    readonly fireGrowAmount = 0;
    readonly removeCosts: number = 5;
    readonly extinguishRange = 0;
    readonly extinguishRate = 0;
    readonly extinguishChance = 0;
    readonly contentCategory = ContentCategory.CONTENT_NATURE;

    isPlaceableOn(cell: Cell): boolean {
        return true;
    }
}
