import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';

export default class Drehleiter extends Content {
    readonly description = 'Drehleiter: Description';
    readonly name = 'Drehleiter';
    readonly id = 'Drehleiter';
    readonly buildCosts: number = 40;
    readonly damageMax = 1;
    readonly removeCosts: number = -20;
    readonly extinguishRange = 3;
    readonly extinguishRate = 2;
    readonly contentCategory = ContentCategory.CONTENT_EXTINGUISHER;
}
