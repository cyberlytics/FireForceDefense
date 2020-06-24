import type LevelDefinition from '../model/LevelDefinition';
import Baumgruppe from '../contents/Baumgruppe';
import Feld from '../cells/Feld';
import Feuer1 from '../effects/Feuer1';
import Gebirge from '../cells/Gebirge';
import HexPosition from '../model/HexPosition';
import See from '../cells/See';
import Steinbrocken from '../contents/Steinbrocken';
import Vulkangestein from '../cells/Vulkangestein';
import Wiese from '../cells/Wiese';
import Haus from '../contents/Haus';
import Gewitter from '../effects/Gewitter';
import Feuerball from '../effects/Feuerball';

const lvl003: LevelDefinition = {
    cellDefinitions: [
        /* Ring 0 */
        { cellType: Feld, pos: new HexPosition(0, 0) },
        /* Ring 1 */
        { cellType: Feld, pos: new HexPosition(1, 0) },
        { cellType: Feld, pos: new HexPosition(0, 1) },
        { cellType: Feld, pos: new HexPosition(-1, 1) },
        { cellType: Feld, pos: new HexPosition(-1, 0) },
        { cellType: Feld, pos: new HexPosition(0, -1) },
        { cellType: Feld, pos: new HexPosition(1, -1) },
        /* Ring 2 */
        { cellType: Wiese, pos: new HexPosition(2, 0) },
        { cellType: Wiese, pos: new HexPosition(1, 1) },
        { cellType: Wiese, pos: new HexPosition(0, 2) },
        { cellType: Wiese, pos: new HexPosition(-1, 2) },
        { cellType: Wiese, pos: new HexPosition(-2, 2) },
        { cellType: Wiese, pos: new HexPosition(-2, 1) },
        { cellType: Wiese, pos: new HexPosition(-2, 0) },
        { cellType: Wiese, pos: new HexPosition(-1, -1) },
        { cellType: Wiese, pos: new HexPosition(0, -2) },
        { cellType: Gebirge, pos: new HexPosition(1, -2) },
        { cellType: Gebirge, pos: new HexPosition(2, -2) },
        { cellType: Wiese, pos: new HexPosition(2, -1) },
        /* Ring 3 */
        { cellType: Feld, pos: new HexPosition(3, 0) },
        { cellType: Feld, pos: new HexPosition(2, 1) },
        { cellType: See, pos: new HexPosition(1, 2) },
        { cellType: See, pos: new HexPosition(0, 3) },
        { cellType: Gebirge, pos: new HexPosition(-1, 3) },
        { cellType: Gebirge, pos: new HexPosition(-2, 3) },
        { cellType: Gebirge, pos: new HexPosition(-3, 3) },
        { cellType: Gebirge, pos: new HexPosition(-3, 2) },
        { cellType: Wiese, pos: new HexPosition(-3, 1) },
        { cellType: Wiese, pos: new HexPosition(-3, 0) },
        { cellType: Feld, pos: new HexPosition(-2, -1) },
        { cellType: Feld, pos: new HexPosition(-1, -2) },
        { cellType: Feld, pos: new HexPosition(0, -3) },
        { cellType: Gebirge, pos: new HexPosition(1, -3) },
        { cellType: Gebirge, pos: new HexPosition(2, -3) },
        { cellType: Vulkangestein, pos: new HexPosition(3, -3) },
        { cellType: Wiese, pos: new HexPosition(3, -2) },
        { cellType: Wiese, pos: new HexPosition(3, -1) },
        /* Ring 4 */
        { cellType: Feld, pos: new HexPosition(4, 0) },
        { cellType: Feld, pos: new HexPosition(3, 1) },
        { cellType: Feld, pos: new HexPosition(2, 2) },
        { cellType: See, pos: new HexPosition(1, 3) },
        { cellType: See, pos: new HexPosition(0, 4) },
        { cellType: See, pos: new HexPosition(-1, 4) },
        { cellType: Gebirge, pos: new HexPosition(-2, 4) },
        { cellType: Gebirge, pos: new HexPosition(-3, 4) },
        { cellType: Gebirge, pos: new HexPosition(-4, 4) },
        { cellType: Gebirge, pos: new HexPosition(-4, 3) },
        { cellType: Gebirge, pos: new HexPosition(-4, 2) },
        { cellType: Wiese, pos: new HexPosition(-4, 1) },
        { cellType: Wiese, pos: new HexPosition(-4, 0) },
        { cellType: Wiese, pos: new HexPosition(-3, -1) },
        { cellType: Feld, pos: new HexPosition(-2, -2) },
        { cellType: Feld, pos: new HexPosition(-1, -3) },
        { cellType: Feld, pos: new HexPosition(0, -4) },
        { cellType: Gebirge, pos: new HexPosition(1, -4) },
        { cellType: Gebirge, pos: new HexPosition(2, -4) },
        { cellType: Vulkangestein, pos: new HexPosition(3, -4) },
        { cellType: Vulkangestein, pos: new HexPosition(4, -4) },
        { cellType: Wiese, pos: new HexPosition(4, -3) },
        { cellType: Wiese, pos: new HexPosition(4, -2) },
        { cellType: Feld,  pos: new HexPosition(4, -1) },
    ],
    contentDefinitions: [
        { contentType: Steinbrocken, pos: new HexPosition(-4, 2) },
        { contentType: Steinbrocken, pos: new HexPosition(1, -3) },
        { contentType: Baumgruppe, pos: new HexPosition(2, -1) },
        { contentType: Baumgruppe, pos: new HexPosition(4, -2) },
        { contentType: Baumgruppe, pos: new HexPosition(-2, 1) },
        { contentType: Baumgruppe, pos: new HexPosition(-4, 1) },
        { contentType: Baumgruppe, pos: new HexPosition(1, 1) },
        { contentType: Haus, pos: new HexPosition(-2, 2) },
        { contentType: Haus, pos: new HexPosition(-1, 2) },
        { contentType: Haus, pos: new HexPosition(0, 2) },
    ],
    effectDefinitions: [
        { effectType: Feuer1, pos: new HexPosition(4, -4), mustBeExecuted: (step) => step % 10 === 0 },
        { effectType: Feuerball, pos: new HexPosition(4, -4), mustBeExecuted: (step) => step === 20 },
        { effectType: Gewitter, pos: new HexPosition(-1, -3), mustBeExecuted: (step) => step === 0 }
    ],
    levelID: 'lvl003',
    creditStartingAmount: 350,
};

export default lvl003;
