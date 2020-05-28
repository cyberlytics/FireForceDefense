import type HexPosition from './HexPosition';
import type Cell from './Cell';

export default interface CellDefinition {
    cellType: typeof  Cell;
    pos: HexPosition;
}
