import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';

export default class Brandreste extends Content {
    readonly description = 'Brandreste: Description';
    readonly name = 'Brandreste';
    readonly id = 'Brandreste';
    readonly buildCosts: null = null;
    readonly damageMax = +Infinity;
    readonly removeCosts: number = 5;
    readonly extinguishRange = 0;
    readonly extinguishRate = 0;
    readonly contentCategory = ContentCategory.CONTENT_NATURE;
}
