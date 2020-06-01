import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';

export default class Baumgruppe extends Content {
    readonly description = 'Baumgruppe: Description';
    readonly name = 'Baumgruppe';
    readonly id = 'Baumgruppe';
    readonly buildCosts: null = null;
    readonly damageMax = Content.DAMAGE_MAX_MEDIUM;
    readonly removeCosts: number = 5;
    readonly extinguishRange = 0;
    readonly extinguishRate = 0;
    readonly contentCategory = ContentCategory.CONTENT_NATURE;
}