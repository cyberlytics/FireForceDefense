<template>
    <div style="height: 0; overflow: hidden">
        <lottie :options="regen" />
        <lottie :options="gewitter" />
        <lottie :options="lava" />
        <lottie :options="feuerball" />
        <lottie :options="smoke" />

        <!-- Feuer1, Feuer2 and Feuer3 don't need animations -->
        <svg
            v-for="effect in ['Feuer1', 'Feuer2', 'Feuer3']"
            :id="'animation-effect-' + effect"
            :key="'animation-effect-' + effect"
            width="0"
            height="0"
            viewBox="0 0 100 100"
        ></svg>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Lottie from 'vue-lottie/src/lottie.vue';
import * as rain from '@assets/animations/rain.json';
import * as thunder from '@assets/animations/thunder.json';
import * as lavaSplash from '@assets/animations/lava-splash.json';
import * as fireball from '@assets/animations/fireball.json';
import * as smoke from '@assets/animations/smoke.json';

export default Vue.extend({
    components: {
        lottie: Lottie,
    },
    data() {
        return {
            regen: {
                animationData: rain,
                name: 'animation-effect-Regen',
                rendererSettings: {
                    id: 'animation-effect-Regen',
                },
            },
            gewitter: {
                animationData: thunder,
                name: 'animation-effect-Gewitter',
                rendererSettings: {
                    id: 'animation-effect-Gewitter',
                },
            },
            lava: {
                animationData: lavaSplash,
                name: 'animation-effect-Lava',
                rendererSettings: {
                    id: 'animation-effect-Lava',
                },
            },
            feuerball: {
                animationData: fireball,
                name: 'animation-effect-Feuerball',
                rendererSettings: {
                    id: 'animation-effect-Feuerball',
                },
            },
            smoke: {
                animationData: smoke,
                name: 'animation-smoke',
                rendererSettings: {
                    id: 'animation-smoke',
                },
            },
        };
    },
    methods: {},
});
</script>
