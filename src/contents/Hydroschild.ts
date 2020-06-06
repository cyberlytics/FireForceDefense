import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';
import type Cell from '../model/Cell';

export default class Hydroschild extends Content {
    readonly description = 'Hydroschild: Description';
    readonly name = 'Hydroschild';
    readonly id = 'Hydroschild';
    readonly buildCosts: number = 15;
    readonly damageMax = Content.DAMAGE_MAX_LOW;
    readonly removeCosts: number = -10;
    readonly extinguishRange = 1;
    readonly extinguishRate = 2;
    readonly contentCategory = ContentCategory.CONTENT_EXTINGUISHER;

    isPlaceableOn(cell: Cell): boolean {
        return cell.groups.includes('land');
    }
}
