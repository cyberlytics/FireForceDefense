import EffectManager from '@model/EffectManager';
import HexPosition from '@model/HexPosition';
import Feld from '@cells/Feld';
import Wiese from '@cells/Wiese';
import See from '@cells/See';
import Waldboden from '@cells/Waldboden';
import Lava from '@effects/Lava';
import LevelMap from '@model/LevelMap';
import FireIntensity from '@model/FireIntensity';

describe('EffectManager', () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    const levelMapDefinition = [
        { pos: new HexPosition(0, 0), cellType: Feld },
        { pos: new HexPosition(0, -1), cellType: Wiese },
        { pos: new HexPosition(1, -1), cellType: Wiese },
        { pos: new HexPosition(1, 0), cellType: Wiese },
        { pos: new HexPosition(0, 1), cellType: See },
        { pos: new HexPosition(-1, 1), cellType: See },
        { pos: new HexPosition(-1, 0), cellType: See },
        { pos: new HexPosition(0, -2), cellType: Waldboden },
        { pos: new HexPosition(1, -2), cellType: Waldboden },
        { pos: new HexPosition(2, -2), cellType: Waldboden },
        { pos: new HexPosition(2, -1), cellType: Waldboden },
        { pos: new HexPosition(2, 0), cellType: Waldboden },
        { pos: new HexPosition(1, 1), cellType: Waldboden },
        { pos: new HexPosition(0, 2), cellType: See },
        { pos: new HexPosition(-1, 2), cellType: See },
        { pos: new HexPosition(-2, 2), cellType: See },
        { pos: new HexPosition(-2, 1), cellType: See },
        { pos: new HexPosition(-2, 0), cellType: See },
        { pos: new HexPosition(-1, -1), cellType: See },
    ];

    test('effects are added to current effects while in action', () => {
        jest.useFakeTimers();
        const effectManager = new EffectManager();
        expect(effectManager.currentEffects).toHaveLength(0);
        const effect = new Lava();
        const levelMap = new LevelMap(levelMapDefinition);
        const pos = new HexPosition(1, -1);
        effectManager.applyEffect(effect, levelMap, pos);
        expect(levelMap.getCellAt(pos).fireIntensity).not.toBe(FireIntensity.INTENSITY_0);
        expect(effectManager.currentEffects[0].effect).toBe(effect);
        jest.advanceTimersByTime(effect.duration * 1000);
        expect(effectManager.currentEffects).toHaveLength(0);
    });
});
