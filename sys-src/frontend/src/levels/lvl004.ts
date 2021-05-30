import type LevelDefinition from '../model/LevelDefinition';
import HexPosition from '../model/HexPosition';
import Steinbrocken from '../contents/Steinbrocken';
import See from '../cells/See';
import Gebirge from '../cells/Gebirge';
import Lavasee from '../cells/Lavasee';
import Vulkangestein from '../cells/Vulkangestein';
import Wueste from '../cells/Wueste';
import Gewitter from '../effects/Gewitter';
import Regen from '../effects/Regen';
import Feuerball from '../effects/Feuerball';
import Haus from '../contents/Haus';
import Lava from '../effects/Lava';
import Totholz from '../contents/Totholz';
import Feuer3 from '../effects/Feuer3';

const lvl004: LevelDefinition = {
    cellDefinitions: [
        /* Ring 0 */
        { cellType: Vulkangestein, pos: new HexPosition(0, 0) },
        /* Ring 1 */
        { cellType: Vulkangestein, pos: new HexPosition(1, 0) },
        { cellType: Vulkangestein, pos: new HexPosition(0, 1) },
        { cellType: Vulkangestein, pos: new HexPosition(-1, 1) },
        { cellType: Vulkangestein, pos: new HexPosition(-1, 0) },
        { cellType: Vulkangestein, pos: new HexPosition(0, -1) },
        { cellType: Lavasee, pos: new HexPosition(1, -1) },
        /* Ring 2 */
        { cellType: Vulkangestein, pos: new HexPosition(2, 0) },
        { cellType: Vulkangestein, pos: new HexPosition(1, 1) },
        { cellType: Wueste, pos: new HexPosition(0, 2) },
        { cellType: Wueste, pos: new HexPosition(-1, 2) },
        { cellType: Gebirge, pos: new HexPosition(-2, 2) },
        { cellType: Gebirge, pos: new HexPosition(-2, 1) },
        { cellType: Wueste, pos: new HexPosition(-2, 0) },
        { cellType: Wueste, pos: new HexPosition(-1, -1) },
        { cellType: Vulkangestein, pos: new HexPosition(0, -2) },
        { cellType: Lavasee, pos: new HexPosition(1, -2) },
        { cellType: Lavasee, pos: new HexPosition(2, -2) },
        { cellType: Lavasee, pos: new HexPosition(2, -1) },
        /* Ring 3 */
        { cellType: Vulkangestein, pos: new HexPosition(3, 0) },
        { cellType: Vulkangestein, pos: new HexPosition(2, 1) },
        { cellType: Vulkangestein, pos: new HexPosition(1, 2) },
        { cellType: Wueste, pos: new HexPosition(0, 3) },
        { cellType: Wueste, pos: new HexPosition(-1, 3) },
        { cellType: Gebirge, pos: new HexPosition(-2, 3) },
        { cellType: Gebirge, pos: new HexPosition(-3, 3) },
        { cellType: Gebirge, pos: new HexPosition(-3, 2) },
        { cellType: Gebirge, pos: new HexPosition(-3, 1) },
        { cellType: Wueste, pos: new HexPosition(-3, 0) },
        { cellType: Wueste, pos: new HexPosition(-2, -1) },
        { cellType: Wueste, pos: new HexPosition(-1, -2) },
        { cellType: Vulkangestein, pos: new HexPosition(0, -3) },
        { cellType: Vulkangestein, pos: new HexPosition(1, -3) },
        { cellType: Lavasee, pos: new HexPosition(2, -3) },
        { cellType: Lavasee, pos: new HexPosition(3, -3) },
        { cellType: Lavasee, pos: new HexPosition(3, -2) },
        { cellType: Vulkangestein, pos: new HexPosition(3, -1) },
        /* Ring 4 */
        { cellType: Vulkangestein, pos: new HexPosition(4, 0) },
        { cellType: Vulkangestein, pos: new HexPosition(3, 1) },
        { cellType: Vulkangestein, pos: new HexPosition(2, 2) },
        { cellType: Vulkangestein, pos: new HexPosition(1, 3) },
        { cellType: See, pos: new HexPosition(0, 4) },
        { cellType: See, pos: new HexPosition(-1, 4) },
        { cellType: See, pos: new HexPosition(-2, 4) },
        { cellType: See, pos: new HexPosition(-3, 4) },
        { cellType: See, pos: new HexPosition(-4, 4) },
        { cellType: Gebirge, pos: new HexPosition(-4, 3) },
        { cellType: Gebirge, pos: new HexPosition(-4, 2) },
        { cellType: Gebirge, pos: new HexPosition(-4, 1) },
        { cellType: Wueste, pos: new HexPosition(-4, 0) },
        { cellType: Wueste, pos: new HexPosition(-3, -1) },
        { cellType: Wueste, pos: new HexPosition(-2, -2) },
        { cellType: Wueste, pos: new HexPosition(-1, -3) },
        { cellType: Vulkangestein, pos: new HexPosition(0, -4) },
        { cellType: Vulkangestein, pos: new HexPosition(1, -4) },
        { cellType: Vulkangestein, pos: new HexPosition(2, -4) },
        { cellType: Vulkangestein, pos: new HexPosition(3, -4) },
        { cellType: Vulkangestein, pos: new HexPosition(4, -4) },
        { cellType: Vulkangestein, pos: new HexPosition(4, -3) },
        { cellType: Vulkangestein, pos: new HexPosition(4, -2) },
        { cellType: Vulkangestein, pos: new HexPosition(4, -1) },
    ],
    contentDefinitions: [
        { contentType: Steinbrocken, pos: new HexPosition(-3, 2) },
        { contentType: Steinbrocken, pos: new HexPosition(-2, -2) },
        { contentType: Steinbrocken, pos: new HexPosition(0, 3) },
        { contentType: Steinbrocken, pos: new HexPosition(-2, 0) },
        { contentType: Haus, pos: new HexPosition(-4, 1) },
        { contentType: Haus, pos: new HexPosition(-2, 3) },
        { contentType: Totholz, pos: new HexPosition(1, 1) },
        { contentType: Totholz, pos: new HexPosition(1, -3) },
        { contentType: Totholz, pos: new HexPosition(4, -2) },
        { contentType: Totholz, pos: new HexPosition(3, 1) },
        { contentType: Totholz, pos: new HexPosition(1, 2) },
        { contentType: Totholz, pos: new HexPosition(-3, 1) },
        { contentType: Totholz, pos: new HexPosition(-1, 2) },
        { contentType: Totholz, pos: new HexPosition(-4, 2) },
        { contentType: Totholz, pos: new HexPosition(-4, 2) },
        { contentType: Totholz, pos: new HexPosition(-4, 2) },
        { contentType: Totholz, pos: new HexPosition(0, -4) },
        { contentType: Totholz, pos: new HexPosition(-2, -1) },
        { contentType: Totholz, pos: new HexPosition(-1, -2) },
        { contentType: Totholz, pos: new HexPosition(0, 0) },
    ],
    effectDefinitions: [
        { effectType: Lava, pos: new HexPosition(2, -2), mustBeExecuted: (step) => step % 50 === 0 },
        { effectType: Gewitter, pos: new HexPosition(2, 1), mustBeExecuted: (step) => step % 12 === 0 },
        { effectType: Regen, pos: new HexPosition(-3, 2), mustBeExecuted: (step) => step % 20 === 0 },
        { effectType: Feuerball, pos: new HexPosition(-2, -1), mustBeExecuted: (step) => step % 30 === 0 },
        { effectType: Feuerball, pos: new HexPosition(0, 2), mustBeExecuted: (step) => step % 30 === 0 },
        { effectType: Feuer3, pos: new HexPosition(-3, -1), mustBeExecuted: (step) => step % 40 === 0 },
        { effectType: Feuer3, pos: new HexPosition(-1, 3), mustBeExecuted: (step) => step % 40 === 0 },
    ],
    levelID: 'lvl004',
    creditStartingAmount: 300,
};

export default lvl004;
