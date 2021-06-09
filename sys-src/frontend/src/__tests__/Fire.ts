import Fire from '@model/Fire';
import FireIntensity from '@model/FireIntensity';

describe('Fire', () => {
    test('intensity to category', () => {
        expect(Fire.intensityToFireCategory(FireIntensity.INTENSITY_0)).toBe(0);
        expect(Fire.intensityToFireCategory(FireIntensity.INTENSITY_1)).toBe(1);
        expect(Fire.intensityToFireCategory(FireIntensity.INTENSITY_2)).toBe(1);
        expect(Fire.intensityToFireCategory(FireIntensity.INTENSITY_3)).toBe(1);
        expect(Fire.intensityToFireCategory(FireIntensity.INTENSITY_4)).toBe(2);
        expect(Fire.intensityToFireCategory(FireIntensity.INTENSITY_5)).toBe(2);
        expect(Fire.intensityToFireCategory(FireIntensity.INTENSITY_6)).toBe(2);
        expect(Fire.intensityToFireCategory(FireIntensity.INTENSITY_7)).toBe(3);
        expect(Fire.intensityToFireCategory(FireIntensity.INTENSITY_8)).toBe(3);
        expect(Fire.intensityToFireCategory(FireIntensity.INTENSITY_9)).toBe(3);
        expect(Fire.intensityToFireCategory(FireIntensity.INTENSITY_10)).toBe(4);
        expect(Fire.intensityToFireCategory(FireIntensity.INTENSITY_11)).toBe(4);
        expect(Fire.intensityToFireCategory(FireIntensity.INTENSITY_12)).toBe(4);
        expect(Fire.intensityToFireCategory(null)).toBe(0);
    });

    test('intensity to damage', () => {
        expect(Fire.intensityToDamage(FireIntensity.INTENSITY_0)).toBe(0);
        expect(Fire.intensityToDamage(FireIntensity.INTENSITY_1)).toBe(1);
        expect(Fire.intensityToDamage(FireIntensity.INTENSITY_2)).toBe(1);
        expect(Fire.intensityToDamage(FireIntensity.INTENSITY_3)).toBe(1);
        expect(Fire.intensityToDamage(FireIntensity.INTENSITY_4)).toBe(2);
        expect(Fire.intensityToDamage(FireIntensity.INTENSITY_5)).toBe(2);
        expect(Fire.intensityToDamage(FireIntensity.INTENSITY_6)).toBe(2);
        expect(Fire.intensityToDamage(FireIntensity.INTENSITY_7)).toBe(3);
        expect(Fire.intensityToDamage(FireIntensity.INTENSITY_8)).toBe(3);
        expect(Fire.intensityToDamage(FireIntensity.INTENSITY_9)).toBe(3);
        expect(Fire.intensityToDamage(FireIntensity.INTENSITY_10)).toBe(4);
        expect(Fire.intensityToDamage(FireIntensity.INTENSITY_11)).toBe(4);
        expect(Fire.intensityToDamage(FireIntensity.INTENSITY_12)).toBe(4);
        expect(Fire.intensityToDamage(null)).toBe(0);
    });

    test('modify intensity (natural increase)', () => {
        expect(Fire.modify(FireIntensity.INTENSITY_0, 1, FireIntensity.INTENSITY_10, true)).toBe(
            FireIntensity.INTENSITY_0,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_1, 1, FireIntensity.INTENSITY_10, true)).toBe(
            FireIntensity.INTENSITY_2,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_2, 1, FireIntensity.INTENSITY_10, true)).toBe(
            FireIntensity.INTENSITY_3,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_3, 1, FireIntensity.INTENSITY_10, true)).toBe(
            FireIntensity.INTENSITY_4,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_4, 1, FireIntensity.INTENSITY_10, true)).toBe(
            FireIntensity.INTENSITY_5,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_5, 1, FireIntensity.INTENSITY_10, true)).toBe(
            FireIntensity.INTENSITY_6,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_6, 1, FireIntensity.INTENSITY_10, true)).toBe(
            FireIntensity.INTENSITY_7,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_7, 1, FireIntensity.INTENSITY_10, true)).toBe(
            FireIntensity.INTENSITY_8,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_8, 1, FireIntensity.INTENSITY_10, true)).toBe(
            FireIntensity.INTENSITY_9,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_9, 1, FireIntensity.INTENSITY_10, true)).toBe(
            FireIntensity.INTENSITY_10,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_10, 1, FireIntensity.INTENSITY_10, true)).toBe(
            FireIntensity.INTENSITY_10,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_11, 1, FireIntensity.INTENSITY_10, true)).toBe(
            FireIntensity.INTENSITY_10,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_12, 1, FireIntensity.INTENSITY_10, true)).toBe(
            FireIntensity.INTENSITY_10,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_10, 1, FireIntensity.INTENSITY_12, true)).toBe(
            FireIntensity.INTENSITY_11,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_11, 1, FireIntensity.INTENSITY_12, true)).toBe(
            FireIntensity.INTENSITY_12,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_12, 1, FireIntensity.INTENSITY_12, true)).toBe(
            FireIntensity.INTENSITY_12,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_7, 2, FireIntensity.INTENSITY_10, true)).toBe(
            FireIntensity.INTENSITY_9,
        );
    });

    test('modify intensity (increase)', () => {
        expect(Fire.modify(FireIntensity.INTENSITY_0, 1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_1);
        expect(Fire.modify(FireIntensity.INTENSITY_1, 1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_2);
        expect(Fire.modify(FireIntensity.INTENSITY_2, 1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_3);
        expect(Fire.modify(FireIntensity.INTENSITY_3, 1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_4);
        expect(Fire.modify(FireIntensity.INTENSITY_4, 1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_5);
        expect(Fire.modify(FireIntensity.INTENSITY_5, 1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_6);
        expect(Fire.modify(FireIntensity.INTENSITY_6, 1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_7);
        expect(Fire.modify(FireIntensity.INTENSITY_7, 1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_8);
        expect(Fire.modify(FireIntensity.INTENSITY_8, 1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_9);
        expect(Fire.modify(FireIntensity.INTENSITY_9, 1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_10);
        expect(Fire.modify(FireIntensity.INTENSITY_10, 1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_10);
        expect(Fire.modify(FireIntensity.INTENSITY_11, 1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_10);
        expect(Fire.modify(FireIntensity.INTENSITY_12, 1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_10);
        expect(Fire.modify(FireIntensity.INTENSITY_10, 1, FireIntensity.INTENSITY_12)).toBe(FireIntensity.INTENSITY_11);
        expect(Fire.modify(FireIntensity.INTENSITY_11, 1, FireIntensity.INTENSITY_12)).toBe(FireIntensity.INTENSITY_12);
        expect(Fire.modify(FireIntensity.INTENSITY_12, 1, FireIntensity.INTENSITY_12)).toBe(FireIntensity.INTENSITY_12);
        expect(Fire.modify(FireIntensity.INTENSITY_7, 2, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_9);
    });

    test('modify intensity (decrease)', () => {
        expect(Fire.modify(FireIntensity.INTENSITY_0, -1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_0);
        expect(Fire.modify(FireIntensity.INTENSITY_1, -1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_0);
        expect(Fire.modify(FireIntensity.INTENSITY_2, -1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_1);
        expect(Fire.modify(FireIntensity.INTENSITY_3, -1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_2);
        expect(Fire.modify(FireIntensity.INTENSITY_4, -1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_3);
        expect(Fire.modify(FireIntensity.INTENSITY_5, -1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_4);
        expect(Fire.modify(FireIntensity.INTENSITY_6, -1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_5);
        expect(Fire.modify(FireIntensity.INTENSITY_7, -1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_6);
        expect(Fire.modify(FireIntensity.INTENSITY_8, -1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_7);
        expect(Fire.modify(FireIntensity.INTENSITY_9, -1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_8);
        expect(Fire.modify(FireIntensity.INTENSITY_10, -1, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_9);
        expect(Fire.modify(FireIntensity.INTENSITY_11, -1, FireIntensity.INTENSITY_10)).toBe(
            FireIntensity.INTENSITY_10,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_12, -1, FireIntensity.INTENSITY_10)).toBe(
            FireIntensity.INTENSITY_10,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_12, -1, FireIntensity.INTENSITY_12)).toBe(
            FireIntensity.INTENSITY_11,
        );
        expect(Fire.modify(FireIntensity.INTENSITY_7, -2, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_5);
    });

    test('modify intensity (no change)', () => {
        expect(Fire.modify(FireIntensity.INTENSITY_7, 0, FireIntensity.INTENSITY_10)).toBe(FireIntensity.INTENSITY_7);
    });
});
