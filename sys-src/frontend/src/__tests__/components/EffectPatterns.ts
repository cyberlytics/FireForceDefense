import { mount } from '@vue/test-utils';
import EffectPatterns from '@components/effectPatterns.vue';

describe('EffectPatterns.vue', () => {
    test('effect patterns match snapshot', () => {
        const wrapper = mount(EffectPatterns);
        expect(wrapper.element).toMatchSnapshot();
    });
});
