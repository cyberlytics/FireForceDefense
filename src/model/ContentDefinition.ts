import type HexPosition from './HexPosition';
import type Content from './Content';

// See https://stackoverflow.com/a/52358194
type ContentClass = typeof Content;
interface ContentDerived extends ContentClass {}

export default interface ContentDefinition {
    contentType: ContentDerived;
    pos: HexPosition;
}
