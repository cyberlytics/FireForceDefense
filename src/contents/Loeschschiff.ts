import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';

export default class Loeschschiff extends Content {
    readonly description = 'Loeschschiff: Description';
    readonly name = 'Loeschschiff';
    readonly id = 'Loeschschiff';
    readonly buildCosts: number = 100;
    readonly damageMax = Content.DAMAGE_MAX_MEDIUM;
    readonly removeCosts: number = -50;
    readonly extinguishRange = 3;
    readonly extinguishRate = 2;
    readonly contentCategory = ContentCategory.CONTENT_EXTINGUISHER;
}
