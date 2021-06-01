<template>
    <g :transform="'translate(' + x + ',' + y + ')'" style="pointer-events: none">
        <circle v-if="debugMode" cx="0" cy="0" :r="radius" stroke="#f0f" fill="url(#effect-debug)" />
        <circle cx="0" cy="0" :r="radius" :fill="'url(#effect-' + effectExecution.effect.id + ')'" />
        <text v-if="debugMode" text-anchor="middle" dominant-baseline="middle" class="level-debug-text">
            {{ effectExecution.effect.name }}
        </text>
    </g>
</template>

<script lang="ts">
import Vue from 'vue';
import HexPosition from '@model/HexPosition';
import type EffectExecution from '@model/EffectExecution';

export default Vue.extend({
    components: {},
    props: {
        effectExecution: { type: Object as () => EffectExecution, required: true },
        size: { type: Number, required: true },
        debugMode: { type: Boolean },
    },
    data() {
        return {};
    },
    computed: {
        x: function () {
            return this.effectExecution.position.getCenterX(this.size);
        },
        y: function () {
            return this.effectExecution.position.getCenterY(this.size);
        },
        radius: function () {
            return HexPosition.getIncircleRadius(this.effectExecution.effect.range, this.size);
        },
    },
    methods: {},
});
</script>
