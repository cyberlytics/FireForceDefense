import Basis from '@contents/Basis';
import Baumgruppe from '@contents/Baumgruppe';
import Brandreste from '@contents/Brandreste';
import Haus from '@contents/Haus';
import Loeschkran from '@contents/Loeschkran';
import Loeschschiff from '@contents/Loeschschiff';
import Loeschtrupp from '@contents/Loeschtrupp';
import Loeschturm from '@contents/Loeschturm';
import Loeschzeppelin from '@contents/Loeschzeppelin';
import Steinbrocken from '@contents/Steinbrocken';
import Totholz from '@contents/Totholz';
import Wiese from '@cells/Wiese';
import HexPosition from '@model/HexPosition';
import See from '@cells/See';

describe('Contents', () => {
    [
        { contentType: Basis, contentName: 'Basis' },
        { contentType: Baumgruppe, contentName: 'Baumgruppe' },
        { contentType: Brandreste, contentName: 'Brandreste' },
        { contentType: Haus, contentName: 'Haus' },
        { contentType: Loeschkran, contentName: 'Loeschkran' },
        { contentType: Loeschschiff, contentName: 'Loeschschiff' },
        { contentType: Loeschtrupp, contentName: 'Loeschtrupp' },
        { contentType: Loeschturm, contentName: 'Loeschturm' },
        { contentType: Loeschzeppelin, contentName: 'Loeschzeppelin' },
        { contentType: Steinbrocken, contentName: 'Steinbrocken' },
        { contentType: Totholz, contentName: 'Totholz' },
    ].forEach(({ contentType, contentName }) => {
        test(`${contentName} can be instantiated and has correct id`, () => {
            const content = new contentType();
            expect(content.id).toBe(contentName);
        });
    });
    test('Basis can only be placed in the central region', () => {
        const content = new Basis();
        const centerCell = new Wiese(new HexPosition(0, 0));
        const centralRegionCell = new Wiese(new HexPosition(1, 0));
        const outerCell = new Wiese(new HexPosition(2, 0));
        expect(content.isPlaceableOn(centerCell)).toBeTruthy();
        expect(content.isPlaceableOn(centralRegionCell)).toBeTruthy();
        expect(content.isPlaceableOn(outerCell)).toBeFalsy();
    });
    [
        { contentType: Basis, contentName: 'Basis' },
        { contentType: Baumgruppe, contentName: 'Baumgruppe' },
        { contentType: Haus, contentName: 'Haus' },
        { contentType: Loeschkran, contentName: 'Loeschkran' },
        { contentType: Loeschtrupp, contentName: 'Loeschtrupp' },
        { contentType: Loeschturm, contentName: 'Loeschturm' },
        { contentType: Loeschzeppelin, contentName: 'Loeschzeppelin' },
        { contentType: Steinbrocken, contentName: 'Steinbrocken' },
        { contentType: Totholz, contentName: 'Totholz' },
    ].forEach(({ contentType, contentName }) => {
        test(`${contentName} can only be placed on land`, () => {
            const content = new contentType();
            const land = new Wiese(new HexPosition(0, 0));
            const water = new See(new HexPosition(0, 0));
            expect(content.isPlaceableOn(land)).toBeTruthy();
            expect(content.isPlaceableOn(water)).toBeFalsy();
        });
    });
    test('Loeschschiff can only be placed on land', () => {
        const content = new Loeschschiff();
        const water = new See(new HexPosition(0, 0));
        const land = new Wiese(new HexPosition(0, 0));
        expect(content.isPlaceableOn(water)).toBeTruthy();
        expect(content.isPlaceableOn(land)).toBeFalsy();
    });
    test('Brandreste can be placed anywhere', () => {
        const content = new Brandreste();
        expect(content.isPlaceableOn()).toBeTruthy();
    });
});
