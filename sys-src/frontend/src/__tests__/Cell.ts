import HexPosition from '@model/HexPosition';
import Wiese from '@cells/Wiese';
import FireIntensity from '@model/FireIntensity';

describe('Cell', () => {
    test('apply damage returns true if cell got destroyed', () => {
        const pos = new HexPosition(-4, 2);
        const cell = new Wiese(pos);
        cell.damage = cell.damageMax - 1;
        cell.fireIntensity = FireIntensity.INTENSITY_12;
        expect(cell.applyDamage()).toBeTruthy();
        expect(cell.damage).toBeGreaterThanOrEqual(cell.damageMax);
    });

    test('apply damage returns false if cell is not destroyed', () => {
        const pos = new HexPosition(-4, 2);
        const cell = new Wiese(pos);
        cell.fireIntensity = FireIntensity.INTENSITY_1;
        expect(cell.applyDamage()).toBeFalsy();
        expect(cell.damage).toBeGreaterThan(0);
    });
});
