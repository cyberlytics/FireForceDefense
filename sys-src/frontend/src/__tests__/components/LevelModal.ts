import { mount, RouterLinkStub } from '@vue/test-utils';
import LevelModal from '@components/levelModal.vue';

describe('LevelModal.vue', () => {
    test('level modal matches snapshot', () => {
        const wrapper = mount(LevelModal, {
            propsData: {
                modalId: 'level-menu-modal',
            },
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
