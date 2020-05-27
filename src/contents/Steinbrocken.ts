import Content from '../model/Content';
import ContentCategory from '../model/ContentCategory';

export default class Steinbrocken extends Content {
    readonly buildCosts: null = null;
    readonly contentCategory = ContentCategory.CONTENT_NATURE;
    readonly damageMax = +Infinity;
    readonly description = 'Steinbrocken: Description';
    readonly extinguishRange = 0;
    readonly extinguishRate = 0;
    readonly id = 'Steinbrocken';
    readonly name = 'Steinbrocken';
    readonly removeCosts: null = null;

}
