import { mount } from '@vue/test-utils';
import RangePreview from '@components/rangePreview.vue';
import HexPosition from '@model/HexPosition';

describe('RangePreview.vue', () => {
    test('range preview matches snapshot', () => {
        const wrapper = mount(RangePreview, {
            propsData: {
                position: new HexPosition(0, 0),
                size: 60,
                range: 2,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });
});
