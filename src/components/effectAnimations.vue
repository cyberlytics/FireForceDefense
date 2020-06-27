<template>
    <div style="height: 0; overflow: hidden;">
        <lottie v-bind:options="regen" />
        <lottie v-bind:options="gewitter" />
        <lottie v-bind:options="lava" />
        <lottie v-bind:options="feuerball" />
        <lottie v-bind:options="smoke" />

        <!-- Feuer1, Feuer2 and Feuer3 don't need animations -->
        <svg
            v-for="effect in ['Feuer1', 'Feuer2', 'Feuer3']"
            width="0" height="0" viewBox="0 0 100 100" v-bind:id="'animation-effect-' + effect"
        >
        </svg>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Lottie from 'vue-lottie/src/lottie.vue';
    import * as rain from '../../assets/animations/rain.json';
    import * as thunder from '../../assets/animations/thunder.json';
    import * as lavaSplash from '../../assets/animations/lava-splash.json'
    import * as fireball from '../../assets/animations/fireball.json'
    import * as smoke from '../../assets/animations/smoke.json';

    export default Vue.extend({
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
            }
        },
        methods: {},
        components: {
            'lottie': Lottie,
        },
    })
</script>
