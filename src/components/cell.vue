<template>
    <g v-bind:transform="'translate(' + x + ',' + y + ')'" @click.stop="click">
        <polygon v-bind:points="pathString" v-bind:fill="'url(#cell-' + cell.id + ')'" stroke="#000" />
        <rect v-if="cell.content !== null" v-bind:fill="'url(#content-' + cell.content.id + ')'"
              v-bind:width="sizeRect" v-bind:height="sizeRect" v-bind:x="-halfSizeRect" v-bind:y="-halfSizeRect" />
        <rect v-if="visualFireIntensity !== 0" v-bind:fill="'url(#fire-' + visualFireIntensity + ')'"
              v-bind:width="sizeRect" v-bind:height="sizeRect" v-bind:x="-halfSizeRect" v-bind:y="-halfSizeRect" />
        <polygon v-bind:points="pathString" v-if="disabled" fill="#000" fill-opacity=".5" />
        <text text-anchor="middle" dominant-baseline="middle" font-size="28" font-weight="bold"
              style="text-shadow: 0 0 1px white,  0 0 2px white, 0 0 3px white;">
            {{ cell.position }}
        </text>
    </g>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Fire from '../model/Fire';

    export default Vue.extend({
        data() {
            return {}
        },
        methods: {
            click: function () {
                // TODO Replace with real code
                console.log('Clicked cell at ' + this.cell.position.toString());

                this.$emit('cell-clicked', this.cell.position);
            },
        },
        components: {},
        computed: {
            pathString: function () {
                const s = parseFloat(this.size.toString());
                const xOff = s * 0.8660254038;
                const halfSize = s * 0.5;
                return (+xOff) + ',' + (-halfSize) + ' '
                    + (+xOff) + ',' + (+halfSize) + ' '
                    + (0    ) + ',' + (+s       ) + ' '
                    + (-xOff) + ',' + (+halfSize) + ' '
                    + (-xOff) + ',' + (-halfSize) + ' '
                    + (0    ) + ',' + (-s       );
            },
            x: function () {
                return this.size * (1.732050808 * this.cell.position.q + 0.8660254038 * this.cell.position.r);
            },
            y: function () {
                return this.size * (1.5 * this.cell.position.r);
            },
            sizeRect: function() {
                return 1.224744871 * this.size; // sqrt(6)/2 * size
            },
            halfSizeRect: function () {
                return 0.6123724357 * this.size // sqrt(6)/4 * size
            },
            visualFireIntensity: function () {
                return Fire.intensityToFireCategory(this.cell.fireIntensity);
            }
        },
        props: ['cell', 'size', 'disabled']
    })
</script>
