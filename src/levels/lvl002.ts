import type LevelDefinition from '../model/LevelDefinition';
import Wiese from '../cells/Wiese';
import HexPosition from '../model/HexPosition';
import Steinbrocken from '../contents/Steinbrocken';
import Feuer1 from '../effects/Feuer1';
import See from '../cells/See';
import Baumgruppe from '../contents/Baumgruppe';

const lvl002: LevelDefinition = {
    cellDefinitions: [
        { cellType: Wiese, pos: new HexPosition(0, 0) }, // ring 0
        { cellType: Wiese, pos: new HexPosition(1, 0) }, // ring 1
        { cellType: Wiese, pos: new HexPosition(0, 1) },
        { cellType: Wiese, pos: new HexPosition(-1, 1) },
        { cellType: Wiese, pos: new HexPosition(-1, 0) },
        { cellType: Wiese, pos: new HexPosition(0, -1) },
        { cellType: Wiese, pos: new HexPosition(1, -1) },
        { cellType: Wiese, pos: new HexPosition(2, 0) }, // ring 2
        { cellType: Wiese, pos: new HexPosition(1, 1) },
        { cellType: Wiese, pos: new HexPosition(0, 2) },
        { cellType: Wiese, pos: new HexPosition(-1, 2) },
        { cellType: Wiese, pos: new HexPosition(-2, 2) },
        { cellType: Wiese, pos: new HexPosition(-2, 1) },
        { cellType: Wiese, pos: new HexPosition(-2, 0) },
        { cellType: Wiese, pos: new HexPosition(-1, -1) },
        { cellType: Wiese, pos: new HexPosition(0, -2) },
        { cellType: Wiese, pos: new HexPosition(1, -2) },
        { cellType: Wiese, pos: new HexPosition(2, -2) },
        { cellType: Wiese, pos: new HexPosition(2, -1) },
        { cellType: Wiese, pos: new HexPosition(3, 0) }, // ring 3
        { cellType: Wiese, pos: new HexPosition(2, 1) },
        { cellType: Wiese, pos: new HexPosition(1, 2) },
        { cellType: Wiese, pos: new HexPosition(0, 3) },
        { cellType: Wiese, pos: new HexPosition(-1, 3) },
        { cellType: Wiese, pos: new HexPosition(-2, 3) },
        { cellType: Wiese, pos: new HexPosition(-3, 3) },
        { cellType: Wiese, pos: new HexPosition(-3, 2) },
        { cellType: Wiese, pos: new HexPosition(-3, 1) },
        { cellType: See, pos: new HexPosition(-3, 0) },
        { cellType: See, pos: new HexPosition(-2, -1) },
        { cellType: Wiese, pos: new HexPosition(-1, -2) },
        { cellType: Wiese, pos: new HexPosition(0, -3) },
        { cellType: Wiese, pos: new HexPosition(1, -3) },
        { cellType: Wiese, pos: new HexPosition(2, -3) },
        { cellType: Wiese, pos: new HexPosition(3, -3) },
        { cellType: Wiese, pos: new HexPosition(3, -2) },
        { cellType: Wiese, pos: new HexPosition(3, -1) },
        { cellType: Wiese, pos: new HexPosition(4, 0) }, // ring 4
        { cellType: Wiese, pos: new HexPosition(3, 1) },
        { cellType: Wiese, pos: new HexPosition(2, 2) },
        { cellType: Wiese, pos: new HexPosition(1, 3) },
        { cellType: Wiese, pos: new HexPosition(0, 4) },
        { cellType: Wiese, pos: new HexPosition(-1, 4) },
        { cellType: Wiese, pos: new HexPosition(-2, 4) },
        { cellType: Wiese, pos: new HexPosition(-3, 4) },
        { cellType: Wiese, pos: new HexPosition(-4, 4) },
        { cellType: Wiese, pos: new HexPosition(-4, 3) },
        { cellType: Wiese, pos: new HexPosition(-4, 2) },
        { cellType: Wiese, pos: new HexPosition(-4, 1) },
        { cellType: See, pos: new HexPosition(-4, 0) },
        { cellType: See, pos: new HexPosition(-3, -1) },
        { cellType: See, pos: new HexPosition(-2, -2) },
        { cellType: Wiese, pos: new HexPosition(-1, -3) },
        { cellType: Wiese, pos: new HexPosition(0, -4) },
        { cellType: Wiese, pos: new HexPosition(1, -4) },
        { cellType: Wiese, pos: new HexPosition(2, -4) },
        { cellType: Wiese, pos: new HexPosition(3, -4) },
        { cellType: Wiese, pos: new HexPosition(4, -4) },
        { cellType: Wiese, pos: new HexPosition(4, -3) },
        { cellType: Wiese, pos: new HexPosition(4, -2) },
        { cellType: Wiese, pos: new HexPosition(4, -1) },
    ],
    contentDefinitions: [
        { contentType: Steinbrocken, pos: new HexPosition(0, 0) },
        { contentType: Steinbrocken, pos: new HexPosition(-2, -2) }, // Should not be placed because it's on a lake
        { contentType: Baumgruppe, pos: new HexPosition(1, 0) },
    ],
    effectDefinitions: [
        { effectType: Feuer1, pos: new HexPosition(0, 0), mustBeExecuted: (step) => step === 0 }
    ],
    levelID: 'lvl002',
    creditStartingAmount: 200,
};

export default lvl002;
