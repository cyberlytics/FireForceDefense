import { mount } from '@vue/test-utils';
import UtilityPatterns from '@components/utilityPatterns.vue';

describe('UtilityPatterns.vue', () => {
    test('utility patterns match snapshot', () => {
        const wrapper = mount(UtilityPatterns);
        expect(wrapper.element).toMatchSnapshot();
    });
});
