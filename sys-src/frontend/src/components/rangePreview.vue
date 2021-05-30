<template>
    <g :transform="'translate(' + x + ',' + y + ')'" style="pointer-events: none">
        <defs>
            <radialGradient id="extinguish-range-gradient">
                <stop offset="10%" stop-color="#FFFFFF" />
                <stop offset="70%" stop-color="#80DDFF" />
                <stop offset="95%" stop-color="#00BBFF" />
                <stop offset="100%" stop-color="#80DDFF" />
            </radialGradient>
        </defs>
        <circle cx="0" cy="0" :r="radius" fill="url('#extinguish-range-gradient')" fill-opacity="0.3" />
    </g>
</template>

<script lang="ts">
import Vue from 'vue';
import HexPosition from '../model/HexPosition';

export default Vue.extend({
    components: {},
    props: {
        position: { type: Object as () => HexPosition, required: true },
        size: { type: Number, required: true },
        range: { type: Number, required: true },
    },
    data() {
        return {};
    },
    computed: {
        x: function () {
            return this.position.getCenterX(this.size);
        },
        y: function () {
            return this.position.getCenterY(this.size);
        },
        radius: function () {
            return HexPosition.getIncircleRadius(this.range, this.size);
        },
    },
    methods: {},
});
</script>
