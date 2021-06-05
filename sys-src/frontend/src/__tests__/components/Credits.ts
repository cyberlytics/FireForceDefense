import { mount, RouterLinkStub } from '@vue/test-utils';
import Credits from '@components/credits.vue';

describe('Credits.vue', () => {
    test('credits match snapshot', () => {
        const wrapper = mount(Credits, {
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
