import type CellDefinition from './CellDefinition';
import type Cell from './Cell';
import type HexPosition from './HexPosition';

export default class LevelMap {
    private cells: {
        [r: number]: {
            [q: number]: Cell
        }
    } = {};

    private positions: HexPosition[] = [];
    private cellsFlat: Cell[] = [];

    constructor(cellDefinitions: CellDefinition[]) {
        cellDefinitions.forEach((cellDefinition) => {
            const pos = cellDefinition.pos;
            if (!this.cells.hasOwnProperty(pos.r)) {
                this.cells[pos.r] = {};
            }
            this.cells[pos.r][pos.q] = new cellDefinition.cellType(pos);
            this.positions.push(pos);
        });
        this.cellsFlat = this.positions.map((pos) => this.getCellAt(pos));
    }

    getCellAt(pos: HexPosition): Cell|null {
        if (!this.cells.hasOwnProperty(pos.r) || !this.cells[pos.r].hasOwnProperty(pos.q)) {
            return null;
        }
        return this.cells[pos.r][pos.q];
    }

    getAllCells() {
        return this.cellsFlat;
    }
}