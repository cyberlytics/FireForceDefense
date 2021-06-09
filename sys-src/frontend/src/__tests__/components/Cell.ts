import { mount } from '@vue/test-utils';
import Cell from '@components/cell.vue';
import Wiese from '@cells/Wiese';
import HexPosition from '@model/HexPosition';
import Baumgruppe from '@contents/Baumgruppe';
import FireIntensity from '@model/FireIntensity';
import Abgebrannt from '@cells/Abgebrannt';
import Brandreste from '@contents/Brandreste';
import Loeschturm from '@contents/Loeschturm';
import Steinbrocken from '@contents/Steinbrocken';

describe('Cell.vue', () => {
    test('empty cell matches snapshot', () => {
        const wrapper = mount(Cell, {
            propsData: {
                cell: new Wiese(new HexPosition(0, 0)),
                size: 60,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });

    test('cell with content matches snapshot', () => {
        const cell = new Wiese(new HexPosition(0, 0));
        cell.content = new Baumgruppe();
        const wrapper = mount(Cell, {
            propsData: {
                cell: cell,
                size: 60,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });

    test('cell with fire matches snapshot', () => {
        const cell = new Wiese(new HexPosition(0, 0));
        cell.fireIntensity = FireIntensity.INTENSITY_12;
        const wrapper = mount(Cell, {
            propsData: {
                cell: cell,
                size: 60,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });

    test('cell of type "Abgebrannt" with fire has smoke', () => {
        const cell = new Abgebrannt(new HexPosition(0, 0));
        cell.fireIntensity = FireIntensity.INTENSITY_3;
        const wrapper = mount(Cell, {
            propsData: {
                cell: cell,
                size: 60,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });

    test('cell with fire and "Brandreste" as content has smoke', () => {
        const cell = new Wiese(new HexPosition(0, 0));
        cell.content = new Brandreste();
        cell.fireIntensity = FireIntensity.INTENSITY_3;
        const wrapper = mount(Cell, {
            propsData: {
                cell: cell,
                size: 60,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });

    test('cell with damaged content has indicator', () => {
        const cell = new Wiese(new HexPosition(0, 0));
        cell.content = new Loeschturm();
        cell.content.damage++;
        const wrapper = mount(Cell, {
            propsData: {
                cell: cell,
                size: 60,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });

    test('cell with damaged, undestroyable content has no indicator', () => {
        const cell = new Wiese(new HexPosition(0, 0));
        cell.content = new Steinbrocken();
        cell.content.damage++;
        const wrapper = mount(Cell, {
            propsData: {
                cell: cell,
                size: 60,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });

    test('emit on mouse enter', () => {
        const wrapper = mount(Cell, {
            propsData: {
                cell: new Wiese(new HexPosition(0, 0)),
                size: 60,
            },
        });
        wrapper.find('g').trigger('mouseenter');
        expect(wrapper.emitted()['mouseenter-cell']).toBeTruthy();
    });

    test('emit on mouse leave', () => {
        const wrapper = mount(Cell, {
            propsData: {
                cell: new Wiese(new HexPosition(0, 0)),
                size: 60,
            },
        });
        wrapper.find('g').trigger('mouseleave');
        expect(wrapper.emitted()['mouseleave-cell']).toBeTruthy();
    });
});
