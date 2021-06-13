import { mount } from '@vue/test-utils';
import Confirm from '@components/confirm.vue';

describe('Confirm.vue', () => {
    test('confirm matches snapshot', () => {
        const wrapper = mount(Confirm, {
            propsData: {
                question: 'snapshot-test-question',
                yes: 'snapshot-test-yes',
                no: 'snapshot-test-no',
            },
            mocks: {
                $t: (key: string) => key,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });
});
