import Feuer1 from '@effects/Feuer1';
import Feuer2 from '@effects/Feuer2';
import Feuer3 from '@effects/Feuer3';
import Feuerball from '@effects/Feuerball';
import Gewitter from '@effects/Gewitter';
import Lava from '@effects/Lava';
import Regen from '@effects/Regen';
import HexPosition from '@model/HexPosition';
import Feld from '@cells/Feld';
import Wiese from '@cells/Wiese';
import See from '@cells/See';
import Waldboden from '@cells/Waldboden';
import LevelMap from '@model/LevelMap';
import HexDirection from '@model/HexDirection';

describe('Effects', () => {
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

    [
        { effectType: Feuer1, effectName: 'Feuer1' },
        { effectType: Feuer2, effectName: 'Feuer2' },
        { effectType: Feuer3, effectName: 'Feuer3' },
        { effectType: Feuerball, effectName: 'Feuerball' },
        { effectType: Gewitter, effectName: 'Gewitter' },
        { effectType: Lava, effectName: 'Lava' },
        { effectType: Regen, effectName: 'Regen' },
    ].forEach(({ effectType, effectName }) => {
        test(`${effectName} can be instantiated and has correct id`, () => {
            const effect = new effectType();
            expect(effect.id).toBe(effectName);
        });
    });

    [
        { effectType: Feuer1, effectName: 'Feuer1' },
        { effectType: Feuer2, effectName: 'Feuer2' },
        { effectType: Feuer3, effectName: 'Feuer3' },
        { effectType: Gewitter, effectName: 'Gewitter' },
    ].forEach(({ effectType, effectName }) => {
        test(`${effectName} increases fire intensity of one cell when applied`, () => {
            const map = new LevelMap(levelMapDefinition);
            const pos = new HexPosition(1, 0);
            const initialFireIntensity = map.getCellAt(pos).fireIntensity;
            const effect = new effectType();
            effect.applyEffect(map, pos);
            const resultingFireIntensity = map.getCellAt(pos).fireIntensity;
            expect(resultingFireIntensity).toBeGreaterThan(initialFireIntensity);
            expect(map.getCellAt(new HexPosition(0, 0)).fireIntensity).toBe(0);
        });
    });

    test('Feuerball increases fire intensity in a radius of 1', () => {
        const map = new LevelMap(levelMapDefinition);
        const pos = new HexPosition(1, 0);
        const neighbor = pos.getNeighborPosition(HexDirection.DIRECTION_180);
        const posInitialFireIntensity = map.getCellAt(pos).fireIntensity;
        const neighborInitialFireIntensity = map.getCellAt(neighbor).fireIntensity;
        const effect = new Feuerball();
        effect.applyEffect(map, pos);
        const posResultingFireIntensity = map.getCellAt(pos).fireIntensity;
        const neighborResultingFireIntensity = map.getCellAt(neighbor).fireIntensity;
        expect(posResultingFireIntensity).toBeGreaterThan(posInitialFireIntensity);
        expect(neighborResultingFireIntensity).toBeGreaterThan(neighborInitialFireIntensity);
        expect(map.getCellAt(new HexPosition(-1, 0)).fireIntensity).toBe(0);
    });

    test('Lava increases fire intensity in a radius of 2', () => {
        const map = new LevelMap(levelMapDefinition);
        const pos = new HexPosition(1, 0);
        const neighbor = pos.getNeighborPosition(HexDirection.DIRECTION_180);
        const neighbor2 = pos.getNeighborPosition(HexDirection.DIRECTION_180);
        const posInitialFireIntensity = map.getCellAt(pos).fireIntensity;
        const neighborInitialFireIntensity = map.getCellAt(neighbor).fireIntensity;
        const neighbor2InitialFireIntensity = map.getCellAt(neighbor2).fireIntensity;
        const effect = new Lava();
        effect.applyEffect(map, pos);
        const posResultingFireIntensity = map.getCellAt(pos).fireIntensity;
        const neighborResultingFireIntensity = map.getCellAt(neighbor).fireIntensity;
        const neighbor2ResultingFireIntensity = map.getCellAt(neighbor2).fireIntensity;
        expect(posResultingFireIntensity).toBeGreaterThan(posInitialFireIntensity);
        expect(neighborResultingFireIntensity).toBeGreaterThan(neighborInitialFireIntensity);
        expect(neighbor2ResultingFireIntensity).toBeGreaterThan(neighbor2InitialFireIntensity);
        expect(map.getCellAt(new HexPosition(-2, 0)).fireIntensity).toBe(0);
    });

    test('Regen decreases fire intensity in a large area', () => {
        const map = new LevelMap(levelMapDefinition);
        const rainPos = new HexPosition(0, 0);
        const firePos = new HexPosition(1, 0);
        const fire = new Feuer1();
        fire.applyEffect(map, firePos);
        const initialFireIntensity = map.getCellAt(firePos).fireIntensity;
        const rain = new Regen();
        rain.applyEffect(map, rainPos);
        const resultingFireIntensity = map.getCellAt(firePos).fireIntensity;
        expect(resultingFireIntensity).toBeLessThan(initialFireIntensity);
        expect(map.getCellAt(rainPos).fireIntensity).toBe(0);
    });
});
