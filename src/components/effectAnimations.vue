<template>
    <div style="height: 0; overflow: hidden;">
        <lottie v-bind:options="regen" />
        <lottie v-bind:options="gewitter" />

        <!-- TODO Replace these placeholders with animated SVGs -->
        <!-- Feuer1, Feuer2 and Feuer3 don't need animations -->
        <svg
            v-for="effect in ['Feuer1', 'Feuer2', 'Feuer3', 'Feuerball', 'Lava']"
            width="0" height="0" viewBox="0 0 100 100" v-bind:id="'animation-effect-' + effect"
        >
            <rect x="0" y="0" width="100" height="100" fill="#f0f" fill-opacity=".3" />
        </svg>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Lottie from 'vue-lottie/src/lottie.vue';
    import * as rain from '../../assets/animations/rain.json';
    import * as thunder from '../../assets/animations/thunder.json';

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
            }
        },
        methods: {},
        components: {
            'lottie': Lottie,
        },
    })
</script>
