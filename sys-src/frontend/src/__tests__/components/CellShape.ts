import { mount } from '@vue/test-utils';
import CellShape from '@components/cellShape.vue';
import HexPosition from '@model/HexPosition';
import Wiese from '@cells/Wiese';

describe('CellShape.vue', () => {
    test('cell shape matches snapshot', () => {
        const wrapper = mount(CellShape, {
            propsData: {
                cell: new Wiese(new HexPosition(0, 0)),
                size: 60,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });
});
