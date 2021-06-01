import type LevelDefinition from '@model/LevelDefinition';
import HexPosition from '@model/HexPosition';
import Baumgruppe from '@contents/Baumgruppe';
import Feld from '@cells/Feld';
import Feuer2 from '@effects/Feuer2';
import Feuer3 from '@effects/Feuer3';
import Gebirge from '@cells/Gebirge';
import Gewitter from '@effects/Gewitter';
import Haus from '@contents/Haus';
import Steinbrocken from '@contents/Steinbrocken';
import See from '@cells/See';
import Waldboden from '@cells/Waldboden';
import Wiese from '@cells/Wiese';
import Wueste from '@cells/Wueste';
import Totholz from '@contents/Totholz';

const lvl002: LevelDefinition = {
    cellDefinitions: [
        /* Ring 0 */
        { cellType: Wueste, pos: new HexPosition(0, 0) },
        /* Ring 1 */
        { cellType: Wueste, pos: new HexPosition(1, 0) },
        { cellType: Wueste, pos: new HexPosition(0, 1) },
        { cellType: Wueste, pos: new HexPosition(-1, 1) },
        { cellType: Wueste, pos: new HexPosition(-1, 0) },
        { cellType: Wueste, pos: new HexPosition(0, -1) },
        { cellType: Wueste, pos: new HexPosition(1, -1) },
        /* Ring 2 */
        { cellType: Wueste, pos: new HexPosition(2, 0) },
        { cellType: Wueste, pos: new HexPosition(1, 1) },
        { cellType: Wueste, pos: new HexPosition(0, 2) },
        { cellType: Wueste, pos: new HexPosition(-1, 2) },
        { cellType: Wueste, pos: new HexPosition(-2, 2) },
        { cellType: Wiese, pos: new HexPosition(-2, 1) },
        { cellType: Wiese, pos: new HexPosition(-2, 0) },
        { cellType: Wiese, pos: new HexPosition(-1, -1) },
        { cellType: Wiese, pos: new HexPosition(0, -2) },
        { cellType: Wiese, pos: new HexPosition(1, -2) },
        { cellType: Wueste, pos: new HexPosition(2, -2) },
        { cellType: Wueste, pos: new HexPosition(2, -1) },
        /* Ring 3 */
        { cellType: Wueste, pos: new HexPosition(3, 0) },
        { cellType: Gebirge, pos: new HexPosition(2, 1) },
        { cellType: Gebirge, pos: new HexPosition(1, 2) },
        { cellType: See, pos: new HexPosition(0, 3) },
        { cellType: See, pos: new HexPosition(-1, 3) },
        { cellType: See, pos: new HexPosition(-2, 3) },
        { cellType: See, pos: new HexPosition(-3, 3) },
        { cellType: See, pos: new HexPosition(-3, 2) },
        { cellType: Feld, pos: new HexPosition(-3, 1) },
        { cellType: Feld, pos: new HexPosition(-3, 0) },
        { cellType: Feld, pos: new HexPosition(-2, -1) },
        { cellType: See, pos: new HexPosition(-1, -2) },
        { cellType: See, pos: new HexPosition(0, -3) },
        { cellType: See, pos: new HexPosition(1, -3) },
        { cellType: Wiese, pos: new HexPosition(2, -3) },
        { cellType: Wueste, pos: new HexPosition(3, -3) },
        { cellType: Wueste, pos: new HexPosition(3, -2) },
        { cellType: Wueste, pos: new HexPosition(3, -1) },
        /* Ring 4 */
        { cellType: Wueste, pos: new HexPosition(4, 0) },
        { cellType: Gebirge, pos: new HexPosition(3, 1) },
        { cellType: Gebirge, pos: new HexPosition(2, 2) },
        { cellType: Gebirge, pos: new HexPosition(1, 3) },
        { cellType: See, pos: new HexPosition(0, 4) },
        { cellType: Waldboden, pos: new HexPosition(-1, 4) },
        { cellType: Waldboden, pos: new HexPosition(-2, 4) },
        { cellType: Waldboden, pos: new HexPosition(-3, 4) },
        { cellType: Waldboden, pos: new HexPosition(-4, 4) },
        { cellType: Waldboden, pos: new HexPosition(-4, 3) },
        { cellType: Waldboden, pos: new HexPosition(-4, 2) },
        { cellType: Feld, pos: new HexPosition(-4, 1) },
        { cellType: Feld, pos: new HexPosition(-4, 0) },
        { cellType: Feld, pos: new HexPosition(-3, -1) },
        { cellType: See, pos: new HexPosition(-2, -2) },
        { cellType: See, pos: new HexPosition(-1, -3) },
        { cellType: See, pos: new HexPosition(0, -4) },
        { cellType: See, pos: new HexPosition(1, -4) },
        { cellType: See, pos: new HexPosition(2, -4) },
        { cellType: Wiese, pos: new HexPosition(3, -4) },
        { cellType: Wueste, pos: new HexPosition(4, -4) },
        { cellType: Wueste, pos: new HexPosition(4, -3) },
        { cellType: Wueste, pos: new HexPosition(4, -2) },
        { cellType: Wueste, pos: new HexPosition(4, -1) },
    ],
    contentDefinitions: [
        { contentType: Steinbrocken, pos: new HexPosition(0, -1) },
        { contentType: Steinbrocken, pos: new HexPosition(-1, 2) },
        { contentType: Steinbrocken, pos: new HexPosition(-4, 4) },
        { contentType: Steinbrocken, pos: new HexPosition(-2, 4) },
        { contentType: Steinbrocken, pos: new HexPosition(3, 0) },
        { contentType: Haus, pos: new HexPosition(-2, 1) },
        { contentType: Haus, pos: new HexPosition(2, -3) },
        { contentType: Baumgruppe, pos: new HexPosition(-2, 4) },
        { contentType: Baumgruppe, pos: new HexPosition(-4, 3) },
        { contentType: Totholz, pos: new HexPosition(2, -1) },
        { contentType: Totholz, pos: new HexPosition(0, 1) },
        { contentType: Totholz, pos: new HexPosition(-2, 2) },
        { contentType: Totholz, pos: new HexPosition(4, -3) },
        { contentType: Totholz, pos: new HexPosition(4, 0) },
    ],
    effectDefinitions: [
        { effectType: Gewitter, pos: new HexPosition(-2, 0), mustBeExecuted: (step) => step === 0 },
        { effectType: Gewitter, pos: new HexPosition(0, 1), mustBeExecuted: (step) => step === 10 },
        { effectType: Gewitter, pos: new HexPosition(-2, 0), mustBeExecuted: (step) => step === 0 },
        { effectType: Feuer2, pos: new HexPosition(2, 0), mustBeExecuted: (step) => step === 6 },
        { effectType: Feuer2, pos: new HexPosition(0, 2), mustBeExecuted: (step) => step === 6 },
        { effectType: Feuer3, pos: new HexPosition(3, -2), mustBeExecuted: (step) => step === 20 },
        { effectType: Feuer3, pos: new HexPosition(4, -4), mustBeExecuted: (step) => step === 20 },
        { effectType: Feuer3, pos: new HexPosition(4, -2), mustBeExecuted: (step) => step === 20 },
        { effectType: Feuer3, pos: new HexPosition(4, -1), mustBeExecuted: (step) => step === 20 },
    ],
    levelID: 'lvl002',
    creditStartingAmount: 200,
};

export default lvl002;
