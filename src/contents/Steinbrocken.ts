import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';

export default class Steinbrocken extends Content {
    readonly description = 'Steinbrocken: Description';
    readonly name = 'Steinbrocken';
    readonly id = 'Steinbrocken';
    readonly buildCosts: null = null;
    readonly damageMax = +Infinity;
    readonly removeCosts: null = null;
    readonly extinguishRange = 0;
    readonly extinguishRate = 0;
    readonly contentCategory = ContentCategory.CONTENT_NATURE;
}
