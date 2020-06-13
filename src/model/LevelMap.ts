import type CellDefinition from './CellDefinition';
import type Cell from './Cell';
import HexPosition from './HexPosition';
import FireIntensity from './FireIntensity';
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

        // TODO Remove; this is just to show the fire intensities.
        setTimeout(() => {
            this.getCellAt(new HexPosition(0, -4)).fireIntensity = FireIntensity.INTENSITY_0;
            this.getCellAt(new HexPosition(1, -4)).fireIntensity = FireIntensity.INTENSITY_1;
            this.getCellAt(new HexPosition(2, -4)).fireIntensity = FireIntensity.INTENSITY_4;
            this.getCellAt(new HexPosition(3, -4)).fireIntensity = FireIntensity.INTENSITY_7;
            this.getCellAt(new HexPosition(4, -4)).fireIntensity = FireIntensity.INTENSITY_10;
        }, 3000);
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

    getCellsAround(center: HexPosition, radius: number) {
        // See https://www.redblobgames.com/grids/hexagons/#range
        return this.positions.filter((p) =>
            p.q >= center.q - radius && p.q <= center.q + radius &&
            p.r >= center.r - Math.min(radius, radius + (p.q - center.q)) && p.r <= center.r + Math.min(radius, radius - (p.q - center.q))
        ).map((pos) => this.getCellAt(pos));
    }

    replaceCell(cell: Cell) {
        if (!this.cells.hasOwnProperty(cell.position.r) || !this.cells[cell.position.r].hasOwnProperty(cell.position.q)) {
            return;
        }
        this.cells[cell.position.r][cell.position.q] = cell;
    }
}
