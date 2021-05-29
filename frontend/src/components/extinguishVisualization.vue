<template>
    <g
        v-bind:transform="'translate(' + x + ',' + y + ')'"
        style="pointer-events: none"
    >
        <defs>
            <radialGradient id="extinguish-visualization-gradient">
                <stop offset="10%" stop-color="#FFFFFF" />
                <stop offset="70%" stop-color="#80DDFF" />
                <stop offset="95%" stop-color="#00BBFF" />
                <stop offset="100%" stop-color="#80DDFF" />
            </radialGradient>
        </defs>
        <circle
            cx="0" cy="0"
            v-bind:r="radius"
            v-bind:fill="'url(#extinguish-visualization-gradient)'"
            fill-opacity=".3"
            class="extinguish-pulse"
        />
    </g>
</template>

<script lang="ts">
    import Vue from 'vue';
    import HexPosition from '../model/HexPosition';

    export default Vue.extend({
        data() {
            return {}
        },
        methods: {},
        components: {},
        computed: {
            x: function () {
                return this.cell.position.getCenterX(this.size);
            },
            y: function () {
                return this.cell.position.getCenterY(this.size);
            },
            radius: function () {
                return HexPosition.getIncircleRadius(this.cell.content.extinguishRange, this.size);
            }
        },
        props: ['cell', 'size']
    })
</script>
