import type HexPosition from './HexPosition';
import type ContentDerivedType from './ContentDerivedType';

export default interface ContentDefinition {
    contentType: ContentDerivedType;
    pos: HexPosition;
}
