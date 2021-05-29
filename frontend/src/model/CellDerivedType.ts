import type Cell from './Cell';

// See https://stackoverflow.com/a/52358194
type CellClass = typeof Cell;
export default interface CellDerivedType extends CellClass {}
