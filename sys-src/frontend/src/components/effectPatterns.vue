<template>
    <defs>
        <radialGradient id="thunder-background">
            <stop offset="10%" stop-color="#000" stop-opacity=".5" />
            <stop offset="100%" stop-color="#000" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="fireball-background">
            <stop offset="10%" stop-color="#fd7e14" stop-opacity=".5" />
            <stop offset="85%" stop-color="#ffae0d" stop-opacity=".3" />
            <stop offset="100%" stop-color="#ffc107" stop-opacity="0" />
        </radialGradient>
        <filter id="lava-filter-mask">
            <feColorMatrix
                in="SourceGraphic"
                type="matrix"
                values="1 1 1 1 0
                                   1 1 1 1 0
                                   1 1 1 1 0
                                   0 0 0 1 0"
            />
        </filter>
        <filter id="lava-filter-extend">
            <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id="lava-filter-drop">
            <feTurbulence type="fractalNoise" baseFrequency="0.15" numOctaves="3" result="turbulence" />
            <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="50"
                xChannelSelector="R"
                yChannelSelector="G"
            />
        </filter>
        <pattern id="lava-animation" width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <use xlink:href="#animation-effect-Lava" x="-40" y="-30" width="180" height="180" />
        </pattern>
        <pattern id="lava-drops" width="1" height="1" viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid slice">
            <circle
                cx="0"
                cy="0"
                r="47"
                fill="transparent"
                stroke="#fff"
                stroke-width="5"
                stroke-dasharray="10 30"
                stroke-linecap="round"
                filter="url(#lava-filter-drop)"
            />
        </pattern>

        <pattern id="smoke" width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <use xlink:href="#animation-smoke" x="0" y="0" width="100" height="100" />
        </pattern>

        <pattern id="effect-Regen" width=".5" height=".35" viewBox="0 0 100 70" preserveAspectRatio="xMidYMid slice">
            <use xlink:href="#animation-effect-Regen" x="-50" y="-65" width="200" height="200" />
        </pattern>

        <pattern id="effect-Gewitter" width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <rect x="0" y="0" width="100" height="100" fill="url(#thunder-background)" />
            <use xlink:href="#animation-effect-Gewitter" x="0" y="0" width="100" height="100" />
        </pattern>

        <pattern id="effect-Feuerball" width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <rect x="0" y="0" width="100" height="100" fill="url(#fireball-background)" />
            <use xlink:href="#animation-effect-Feuerball" x="0" y="0" width="100" height="100" />
        </pattern>

        <pattern id="effect-Lava" width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <rect fill="url(#lava-animation)" x="0" y="00" width="100" height="100" filter="url(#lava-filter-extend)" />
            <mask id="lava-mask" x="0" y="0" width="100" height="100">
                <g transform="translate(50,50)">
                    <circle class="lava-pulse" cx="0" cy="0" r="50" fill="url(#lava-drops)" />
                </g>
                <rect
                    fill="url(#lava-animation)"
                    x="0"
                    y="00"
                    width="100"
                    height="100"
                    filter="url(#lava-filter-mask)"
                    fill-opacity=".7"
                />
            </mask>
            <image x="0" y="0" :xlink:href="'/assets/lava.svg'" width="100" height="100" mask="url(#lava-mask)" />
        </pattern>

        <pattern
            v-for="effect in ['Feuer1', 'Feuer2', 'Feuer3']"
            :id="'effect-' + effect"
            :key="'effect-' + effect"
            width="1"
            height="1"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
        >
            <use :xlink:href="'#animation-effect-' + effect" x="0" y="0" width="100" height="100" />
        </pattern>

        <pattern
            id="effect-debug"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            preserveAspectRatio="xMidYMid slice"
            patternUnits="userSpaceOnUse"
        >
            <line x1="0" x2="10" y1="0" y2="10" stroke="#f0f" stroke-opacity=".3" />
            <line x1="0" x2="10" y1="10" y2="0" stroke="#f0f" stroke-opacity=".3" />
        </pattern>
    </defs>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    components: {},
    data() {
        return {};
    },
    methods: {},
});
</script>
