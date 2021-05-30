import type Cell from './Cell';

// See https://stackoverflow.com/a/52358194
type CellClass = typeof Cell;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface CellDerivedType extends CellClass {}
