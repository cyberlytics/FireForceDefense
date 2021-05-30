import HexPosition from '../model/HexPosition';
import HexDirection from '../model/HexDirection';

describe('HexPosition', () => {
    test('Construction from axial components', () => {
        const pos = new HexPosition(1, 0);
        expect(pos.q).toBe(1);
        expect(pos.r).toBe(0);

        expect(pos.x).toBe(1);
        expect(pos.y).toBe(-1);
        expect(pos.z).toBe(0);
    });

    test('Construction from axial coordinates', () => {
        const pos = HexPosition.fromAxial({ q: -1, r: 1 });
        expect(pos.q).toBe(-1);
        expect(pos.r).toBe(1);

        expect(pos.x).toBe(-1);
        expect(pos.y).toBe(0);
        expect(pos.z).toBe(1);
    });

    test('Construction from cube coordinates', () => {
        const pos = HexPosition.fromCube({ x: 0, y: 1, z: -1 });
        expect(pos.q).toBe(0);
        expect(pos.r).toBe(-1);

        expect(pos.x).toBe(0);
        expect(pos.y).toBe(1);
        expect(pos.z).toBe(-1);
    });

    test('Get direction vector for 0deg', () => {
        const dir = HexPosition.getDirectionVector(HexDirection.DIRECTION_0);
        expect(dir.q).toBe(1);
        expect(dir.r).toBe(0);
    });

    test('Get direction vector for 240deg', () => {
        const dir = HexPosition.getDirectionVector(HexDirection.DIRECTION_240);
        expect(dir.q).toBe(-1);
        expect(dir.r).toBe(1);
    });

    test('Addition', () => {
        const pos = HexPosition.add(new HexPosition(1, -1), new HexPosition(1, 0));
        expect(pos.q).toBe(2);
        expect(pos.r).toBe(-1);
    });

    test('Neighbor', () => {
        const pos = new HexPosition(-1, 0).getNeighborPosition(HexDirection.DIRECTION_60);
        expect(pos.q).toBe(0);
        expect(pos.r).toBe(-1);
    });

    test('To String', () => {
        const pos = new HexPosition(-1, 0);
        expect(pos.toString()).toBe('(-1,0)');
    });

    test('Width', () => {
        expect(HexPosition.getWidth()).toBe(Math.sqrt(3));
    });

    test('getIncircleRadiusHorizontalComponent: 0', () => {
        expect(HexPosition.getIncircleRadiusHorizontalComponent(0)).toBe(0.5 * HexPosition.getWidth());
    });

    test('getIncircleRadiusHorizontalComponent: 1', () => {
        expect(HexPosition.getIncircleRadiusHorizontalComponent(1)).toBe(HexPosition.getWidth());
    });

    test('getIncircleRadiusHorizontalComponent: 2', () => {
        expect(HexPosition.getIncircleRadiusHorizontalComponent(2)).toBe(2 * HexPosition.getWidth());
    });

    test('getIncircleRadiusHorizontalComponent: 3', () => {
        expect(HexPosition.getIncircleRadiusHorizontalComponent(3)).toBe(2.5 * HexPosition.getWidth());
    });

    test('getIncircleRadiusHorizontalComponent: 4', () => {
        expect(HexPosition.getIncircleRadiusHorizontalComponent(4)).toBe(3.5 * HexPosition.getWidth());
    });

    test('getIncircleRadiusHorizontalComponent: 5', () => {
        expect(HexPosition.getIncircleRadiusHorizontalComponent(5)).toBe(4 * HexPosition.getWidth());
    });

    test('getIncircleRadiusVerticalComponent: 0', () => {
        expect(HexPosition.getIncircleRadiusVerticalComponent(0)).toBe(0);
    });

    test('getIncircleRadiusVerticalComponent: 1', () => {
        expect(HexPosition.getIncircleRadiusVerticalComponent(1)).toBe(1);
    });

    test('getIncircleRadiusVerticalComponent: 2', () => {
        expect(HexPosition.getIncircleRadiusVerticalComponent(2)).toBe(1);
    });

    test('getIncircleRadiusVerticalComponent: 3', () => {
        expect(HexPosition.getIncircleRadiusVerticalComponent(3)).toBe(2.5);
    });

    test('getIncircleRadiusVerticalComponent: 4', () => {
        expect(HexPosition.getIncircleRadiusVerticalComponent(4)).toBe(2.5);
    });

    test('getIncircleRadiusVerticalComponent: 5', () => {
        expect(HexPosition.getIncircleRadiusVerticalComponent(5)).toBe(4);
    });
});
