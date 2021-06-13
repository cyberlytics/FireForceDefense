import FireIntensity from '@model/FireIntensity';
import Loeschturm from '@contents/Loeschturm';

describe('Content', () => {
    test('apply damage returns true if content got destroyed', () => {
        const content = new Loeschturm();
        content.damage = content.damageMax - 1;
        expect(content.applyDamage(FireIntensity.INTENSITY_12)).toBeTruthy();
        expect(content.damage).toBeGreaterThanOrEqual(content.damageMax);
    });

    test('apply damage returns false if content is not destroyed', () => {
        const content = new Loeschturm();
        expect(content.applyDamage(FireIntensity.INTENSITY_1)).toBeFalsy();
        expect(content.damage).toBeGreaterThan(0);
    });
});
