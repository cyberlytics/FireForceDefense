import { mount } from '@vue/test-utils';
import PreviewCursor from '@components/previewCursor.vue';
import Loeschturm from '@contents/Loeschturm';

describe('PreviewCursor.vue', () => {
    test('empty preview cursor matches snapshot', () => {
        const wrapper = mount(PreviewCursor, {
            propsData: {
                contentToBuild: null,
                mouseX: 13,
                mouseY: 37,
                removeMode: false,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });

    test('preview cursor with content to build matches snapshot', () => {
        const wrapper = mount(PreviewCursor, {
            propsData: {
                contentToBuild: Loeschturm,
                mouseX: 13,
                mouseY: 37,
                removeMode: false,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });

    test('preview cursor in remove mode matches snapshot', () => {
        const wrapper = mount(PreviewCursor, {
            propsData: {
                contentToBuild: null,
                mouseX: 13,
                mouseY: 37,
                removeMode: true,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });

    test('contentToBuild takes precedence over removeMode', () => {
        const wrapper = mount(PreviewCursor, {
            propsData: {
                contentToBuild: Loeschturm,
                mouseX: 13,
                mouseY: 37,
                removeMode: true,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });
});
