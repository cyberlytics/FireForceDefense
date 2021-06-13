import { mount, RouterLinkStub } from '@vue/test-utils';
import LevelEndScreen from '@components/levelEndScreen.vue';
import Score from '@model/Score';

describe('LevelEndScreen.vue', () => {
    test('level end screen (success) matches snapshot', () => {
        const wrapper = mount(LevelEndScreen, {
            propsData: {
                score: Score.THREE_STARS,
                nextLevel: 'lvl002',
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
    test('level end screen (failure) matches snapshot', () => {
        const wrapper = mount(LevelEndScreen, {
            propsData: {
                score: Score.UNLOCKED,
                nextLevel: 'lvl002',
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
    test('level end screen (success, last level) matches snapshot', () => {
        const wrapper = mount(LevelEndScreen, {
            propsData: {
                score: Score.THREE_STARS,
                nextLevel: null,
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
