import type LevelDefinition from '../model/LevelDefinition';
import Wiese from '../cells/Wiese';
import HexPosition from '../model/HexPosition';
import Steinbrocken from '../contents/Steinbrocken';
import See from '../cells/See';
import Baumgruppe from '../contents/Baumgruppe';
import Haus from '../contents/Haus';
import Feld from '../cells/Feld';
import Waldboden from '../cells/Waldboden';
import Gewitter from '../effects/Gewitter';
import Regen from '../effects/Regen';

const lvl001: LevelDefinition = {
    cellDefinitions: [
        /* Ring 0 */
        { cellType: Wiese, pos: new HexPosition(0, 0) },
        /* Ring 1 */
        { cellType: Wiese, pos: new HexPosition(1, 0) },
        { cellType: Wiese, pos: new HexPosition(0, 1) },
        { cellType: Wiese, pos: new HexPosition(-1, 1) },
        { cellType: Wiese, pos: new HexPosition(-1, 0) },
        { cellType: Wiese, pos: new HexPosition(0, -1) },
        { cellType: Wiese, pos: new HexPosition(1, -1) },
        /* Ring 2 */
        { cellType: Wiese, pos: new HexPosition(2, 0) },
        { cellType: Wiese, pos: new HexPosition(1, 1) },
        { cellType: Wiese, pos: new HexPosition(0, 2) },
        { cellType: Wiese, pos: new HexPosition(-1, 2) },
        { cellType: Wiese, pos: new HexPosition(-2, 2) },
        { cellType: See, pos: new HexPosition(-2, 1) },
        { cellType: See, pos: new HexPosition(-2, 0) },
        { cellType: See, pos: new HexPosition(-1, -1) },
        { cellType: Wiese, pos: new HexPosition(0, -2) },
        { cellType: Wiese, pos: new HexPosition(1, -2) },
        { cellType: Wiese, pos: new HexPosition(2, -2) },
        { cellType: Wiese, pos: new HexPosition(2, -1) },
        /* Ring 3 */
        { cellType: Wiese, pos: new HexPosition(3, 0) },
        { cellType: Wiese, pos: new HexPosition(2, 1) },
        { cellType: Wiese, pos: new HexPosition(1, 2) },
        { cellType: Wiese, pos: new HexPosition(0, 3) },
        { cellType: Wiese, pos: new HexPosition(-1, 3) },
        { cellType: Wiese, pos: new HexPosition(-2, 3) },
        { cellType: Wiese, pos: new HexPosition(-3, 3) },
        { cellType: See, pos: new HexPosition(-3, 2) },
        { cellType: See, pos: new HexPosition(-3, 1) },
        { cellType: See, pos: new HexPosition(-3, 0) },
        { cellType: See, pos: new HexPosition(-2, -1) },
        { cellType: See, pos: new HexPosition(-1, -2) },
        { cellType: Wiese, pos: new HexPosition(0, -3) },
        { cellType: Wiese, pos: new HexPosition(1, -3) },
        { cellType: Wiese, pos: new HexPosition(2, -3) },
        { cellType: Wiese, pos: new HexPosition(3, -3) },
        { cellType: Wiese, pos: new HexPosition(3, -2) },
        { cellType: Wiese, pos: new HexPosition(3, -1) },
        /* Ring 4 */
        { cellType: Feld, pos: new HexPosition(4, 0) },
        { cellType: Feld, pos: new HexPosition(3, 1) },
        { cellType: Feld, pos: new HexPosition(2, 2) },
        { cellType: Wiese, pos: new HexPosition(1, 3) },
        { cellType: Waldboden, pos: new HexPosition(0, 4) },
        { cellType: Waldboden, pos: new HexPosition(-1, 4) },
        { cellType: Waldboden, pos: new HexPosition(-2, 4) },
        { cellType: Waldboden, pos: new HexPosition(-3, 4) },
        { cellType: Waldboden, pos: new HexPosition(-4, 4) },
        { cellType: See, pos: new HexPosition(-4, 3) },
        { cellType: See, pos: new HexPosition(-4, 2) },
        { cellType: See, pos: new HexPosition(-4, 1) },
        { cellType: See, pos: new HexPosition(-4, 0) },
        { cellType: See, pos: new HexPosition(-3, -1) },
        { cellType: See, pos: new HexPosition(-2, -2) },
        { cellType: See, pos: new HexPosition(-1, -3) },
        { cellType: Waldboden, pos: new HexPosition(0, -4) },
        { cellType: Waldboden, pos: new HexPosition(1, -4) },
        { cellType: Waldboden, pos: new HexPosition(2, -4) },
        { cellType: Waldboden, pos: new HexPosition(3, -4) },
        { cellType: Waldboden, pos: new HexPosition(4, -4) },
        { cellType: Wiese, pos: new HexPosition(4, -3) },
        { cellType: Feld, pos: new HexPosition(4, -2) },
        { cellType: Feld, pos: new HexPosition(4, -1) },
    ],
    contentDefinitions: [
        { contentType: Steinbrocken, pos: new HexPosition(2, -2) },
        { contentType: Steinbrocken, pos: new HexPosition(2, 0) },
        { contentType: Steinbrocken, pos: new HexPosition(1, 3) },
        { contentType: Baumgruppe, pos: new HexPosition(-3, 4) },
        { contentType: Baumgruppe, pos: new HexPosition(-1, 4) },
        { contentType: Baumgruppe, pos: new HexPosition(1, -4) },
        { contentType: Baumgruppe, pos: new HexPosition(2, -4) },
        { contentType: Baumgruppe, pos: new HexPosition(0, 2) },
        { contentType: Baumgruppe, pos: new HexPosition(4, -4) },
        { contentType: Haus, pos: new HexPosition(-2, 3) },
        { contentType: Haus, pos: new HexPosition(1, -3) },
    ],
    effectDefinitions: [
        { effectType: Gewitter, pos: new HexPosition(2, -1), mustBeExecuted: (step) => step === 0 },
        { effectType: Regen, pos: new HexPosition(0, 0), mustBeExecuted: (step) => step % 10 === 0 },
    ],
    levelID: 'lvl001',
    creditStartingAmount: 150,
};

export default lvl001;
