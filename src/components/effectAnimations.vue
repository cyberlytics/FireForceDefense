<template>
    <div :style="{ height: 0 }">
        <!-- TODO Use the current 'Regen' animation as extinguishing animation and use a different one for 'Regen' -->
        <lottie width="0" height="0" v-bind:options="regen" />

        <!-- TODO Replace these placeholders with animated SVGs -->
        <!-- Feuer1, Feuer2 and Feuer3 don't need animations -->
        <svg
            v-for="effect in ['Feuer1', 'Feuer2', 'Feuer3', 'Feuerball', 'Gewitter', 'Lava']"
            width="0" height="0" viewBox="0 0 100 100" v-bind:id="'animation-effect-' + effect"
        >
            <rect x="0" y="0" width="100" height="100" fill="#f0f" fill-opacity=".3" />
        </svg>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Lottie from 'vue-lottie/src/lottie.vue';
    import * as regen from '../../assets/regen.json';

    export default Vue.extend({
        data() {
            return {
                regen: {
                    animationData: regen,
                    name: 'animation-effect-Regen',
                    rendererSettings: {
                        id: 'animation-effect-Regen',
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
