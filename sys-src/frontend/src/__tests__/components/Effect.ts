import { mount } from '@vue/test-utils';
import Effect from '@components/effect.vue';
import EffectExecution from '@model/EffectExecution';
import Lava from '@effects/Lava';
import HexPosition from '@model/HexPosition';

describe('Effect.vue', () => {
    test('effect matches snapshot', () => {
        const wrapper = mount(Effect, {
            propsData: {
                effectExecution: new EffectExecution(new Lava(), new HexPosition(0, 0)),
                size: 60,
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    });
});
