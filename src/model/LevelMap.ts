import type CellDefinition from './CellDefinition';
import type Cell from './Cell';
import HexPosition from './HexPosition';
import See from '../cells/See';

export default class LevelMap {
    private cells: {
        [r: number]: {
            [q: number]: Cell
        }
    } = {};

    private positions: HexPosition[] = [];

    constructor(cellDefinitions: CellDefinition[]) {
        cellDefinitions.forEach((cellDefinition) => {
            const pos = cellDefinition.pos;
            if (!this.cells.hasOwnProperty(pos.r)) {
                this.cells[pos.r] = {};
            }
            this.cells[pos.r][pos.q] = new cellDefinition.cellType(pos);
            this.positions.push(pos);
        });

        // TODO Remove, this is only to demonstrate cell reactivity
        setTimeout(() => {
            this.cells[0][-1] = new See(new HexPosition(-1, 0));
        }, 5000);
    }

    getCellAt(pos: HexPosition): Cell|null {
        if (!this.cells.hasOwnProperty(pos.r) || !this.cells[pos.r].hasOwnProperty(pos.q)) {
            return null;
        }
        return this.cells[pos.r][pos.q];
    }

    getAllCells() {
        return this.positions.map((pos) => this.getCellAt(pos));
    }
}
