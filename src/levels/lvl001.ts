import type LevelDefinition from '../model/LevelDefinition';
import Wiese from '../cells/Wiese';
import HexPosition from '../model/HexPosition';
import Steinbrocken from '../contents/Steinbrocken';
import Feuer1 from '../effects/Feuer1';

const lvl001: LevelDefinition = {
    cellDefinitions: [
        { cellType: Wiese, pos: new HexPosition(0, 0) },
    ],
    contentDefinitions: [
        { contentType: Steinbrocken, pos: new HexPosition(0, 0) },
    ],
    effectDefinitions: [
        { effectType: Feuer1, pos: new HexPosition(0, 0), after: 0 }
    ],
    levelID: 'lvl001',
};

export default lvl001;
