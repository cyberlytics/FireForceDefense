import type HexPosition from './HexPosition';
import type CellDerivedType from './CellDerivedType';

export default interface CellDefinition {
    cellType: CellDerivedType;
    pos: HexPosition;
}
