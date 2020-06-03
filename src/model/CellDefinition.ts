import type HexPosition from './HexPosition';
import type Cell from './Cell';

// See https://stackoverflow.com/a/52358194
type CellClass = typeof Cell;
interface CellDerived extends CellClass {}

export default interface CellDefinition {
    cellType: CellDerived;
    pos: HexPosition;
}
