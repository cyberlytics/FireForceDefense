import type HexPosition from './HexPosition';
import type Content from './Content';

export default interface ContentDefinition {
    contentType: typeof Content;
    pos: HexPosition;
}
