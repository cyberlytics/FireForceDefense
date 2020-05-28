import type LevelDefinition from '../model/LevelDefinition';
import Wiese from '../cells/Wiese';
import HexPosition from '../model/HexPosition';
import Steinbrocken from '../contents/Steinbrocken';
import Feuer1 from '../effects/Feuer1';

const lvl001: LevelDefinition = {
    cellDefinitions: [
        { cellType: Wiese, pos: new HexPosition(/* TODO: Insert coordinates here*/) },
    ],
    contentDefinitions: [
        { contentType: Steinbrocken, pos: new HexPosition(/* TODO: Insert coordinates here*/) },
    ],
    effectDefinitions: [
        { effectType: Feuer1, pos: new HexPosition(/* TODO: Insert coordinates here*/), after: 0 }
    ],
    levelID: 'lvl001',
};

export default lvl001;
