import { mount } from '@vue/test-utils';
import ContentPatterns from '@components/contentPatterns.vue';

describe('ContentPatterns.vue', () => {
    test('content patterns match snapshot', () => {
        const wrapper = mount(ContentPatterns);
        expect(wrapper.element).toMatchSnapshot();
    });
});
