import { mount } from '@vue/test-utils';
import ExtinguishVisualization from '@components/extinguishVisualization.vue';
import Wiese from '@cells/Wiese';
import HexPosition from '@model/HexPosition';
import Loeschturm from '@contents/Loeschturm';

describe('ExtinguishVisualization.vue', () => {
    test('extinguish visualization matches snapshot', () => {
        const cell = new Wiese(new HexPosition(0, 0));
        cell.content = new Loeschturm();
        const wrapper = mount(ExtinguishVisualization, {
            propsData: {
                cell,
                size: 60,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });
});
