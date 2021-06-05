import { mount } from '@vue/test-utils';
import CellPatterns from '@components/cellPatterns.vue';

describe('CellPatterns.vue', () => {
    test('cell patterns match snapshot', () => {
        const wrapper = mount(CellPatterns);
        expect(wrapper.element).toMatchSnapshot();
    });
});
