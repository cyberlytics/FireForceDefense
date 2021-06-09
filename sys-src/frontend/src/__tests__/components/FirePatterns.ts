import { mount } from '@vue/test-utils';
import FirePatterns from '@components/firePatterns.vue';

describe('FirePatterns.vue', () => {
    test('fire patterns match snapshot', () => {
        const wrapper = mount(FirePatterns);
        expect(wrapper.element).toMatchSnapshot();
    });
});
