import Abgebrannt from '@cells/Abgebrannt';
import HexPosition from '@model/HexPosition';
import Feld from '@cells/Feld';
import Gebirge from '@cells/Gebirge';
import Lavasee from '@cells/Lavasee';
import See from '@cells/See';
import Vulkangestein from '@cells/Vulkangestein';
import Waldboden from '@cells/Waldboden';
import Wiese from '@cells/Wiese';
import Wueste from '@cells/Wueste';

describe('Cells', () => {
    [
        { cellType: Abgebrannt, cellName: 'Abgebrannt' },
        { cellType: Feld, cellName: 'Feld' },
        { cellType: Gebirge, cellName: 'Gebirge' },
        { cellType: Lavasee, cellName: 'Lavasee' },
        { cellType: See, cellName: 'See' },
        { cellType: Vulkangestein, cellName: 'Vulkangestein' },
        { cellType: Waldboden, cellName: 'Waldboden' },
        { cellType: Wiese, cellName: 'Wiese' },
        { cellType: Wueste, cellName: 'Wueste' },
    ].forEach(({ cellType, cellName }) => {
        test(`${cellName} can be instantiated and has correct id`, () => {
            const pos = new HexPosition(-4, 2);
            const cell = new cellType(pos);
            expect(cell.id).toBe(cellName);
            expect(cell.position).toBe(pos);
        });
    });
});
