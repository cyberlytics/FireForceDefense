import { mount, RouterLinkStub } from '@vue/test-utils';
import Index from '@components/index.vue';
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate)

describe('Index.vue', () => {
    test('index matches snapshot', () => {
        const wrapper = mount(Index, {
            mocks: {
                $t: (key: string) => key,
            },
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });
});
