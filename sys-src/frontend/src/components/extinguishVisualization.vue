<template>
    <g :transform="'translate(' + x + ',' + y + ')'" style="pointer-events: none">
        <defs>
            <radialGradient id="extinguish-visualization-gradient">
                <stop offset="10%" stop-color="#FFFFFF" />
                <stop offset="70%" stop-color="#80DDFF" />
                <stop offset="95%" stop-color="#00BBFF" />
                <stop offset="100%" stop-color="#80DDFF" />
            </radialGradient>
        </defs>
        <circle
            cx="0"
            cy="0"
            :r="radius"
            :fill="'url(#extinguish-visualization-gradient)'"
            fill-opacity=".3"
            class="extinguish-pulse"
        />
    </g>
</template>

<script lang="ts">
import Vue from 'vue';
import HexPosition from '../model/HexPosition';
import type Cell from '../model/Cell';

export default Vue.extend({
    components: {},
    props: {
        cell: { type: Object as () => Cell, required: true },
        size: { type: Number, required: true },
    },
    data() {
        return {};
    },
    computed: {
        x: function () {
            return this.cell.position.getCenterX(this.size);
        },
        y: function () {
            return this.cell.position.getCenterY(this.size);
        },
        radius: function () {
            return HexPosition.getIncircleRadius(this.cell.content.extinguishRange, this.size);
        },
    },
    methods: {},
});
</script>
