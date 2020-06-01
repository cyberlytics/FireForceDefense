import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';

export default class Loeschtrupp extends Content {
    readonly description = 'Loeschtrupp: Description';
    readonly name = 'Loeschtrupp';
    readonly id = 'Loeschtrupp';
    readonly buildCosts: number = 10;
    readonly damageMax = 1;
    readonly removeCosts: number = -7;
    readonly extinguishRange = 2;
    readonly extinguishRate = 1;
    readonly contentCategory = ContentCategory.CONTENT_EXTINGUISHER;
}