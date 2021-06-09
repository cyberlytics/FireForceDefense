import { mount, RouterLinkStub } from '@vue/test-utils';
import LevelSidebar from '@components/levelSidebar.vue';
import Game from '@model/Game';

describe('LevelSidebar.vue', () => {
    test('level sidebar matches snapshot', () => {
        const wrapper = mount(LevelSidebar, {
            propsData: {
                reliefGotActivated: false,
                buildableContents: Game.getBuildableContents(),
                helpTexts: [],
                totalMoney: 42,
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

    test('emit "set help text" when hovering the money display', () => {
        const wrapper = mount(LevelSidebar, {
            propsData: {
                reliefGotActivated: false,
                buildableContents: Game.getBuildableContents(),
                helpTexts: [],
                totalMoney: 42,
                modalId: 'level-menu-modal',
            },
            mocks: {
                $t: (key: string) => key,
            },
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });
        wrapper.find('#money').trigger('mouseenter');
        wrapper.find('#money').trigger('mouseleave');
        expect(typeof wrapper.emitted()['set-help-text'][0][0]).toBe('string');
        expect(wrapper.emitted()['set-help-text'][0][0]).not.toHaveLength(0);
        expect(wrapper.emitted()['set-help-text'][1][0]).toBeNull();
    });

    // TODO more tests can be added later, for example:
    // - Relief activated: true/false
    // - Hovering over all kinds of elements
    // - Setting the help text
});
