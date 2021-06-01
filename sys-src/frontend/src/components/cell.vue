<template>
    <g
        :transform="'translate(' + x + ',' + y + ')'"
        @click.stop="click"
        @mouseenter="$emit('mouseenter-cell')"
        @mouseleave="$emit('mouseleave-cell')"
    >
        <polygon :points="pathString" :fill="'url(#cell-' + cell.id + ')'" stroke="#000" />
        <rect
            v-if="cell.content !== null"
            :fill="'url(#content-' + cell.content.id + ')'"
            :width="sizeRect"
            :height="sizeRect"
            :x="-halfSizeRect"
            :y="-halfSizeRect"
        />
        <rect
            v-if="
                cell.fireIntensity > 0 &&
                (cell.id === 'Abgebrannt' || (cell.content !== null && cell.content.id === 'Brandreste'))
            "
            fill="url(#smoke)"
            fill-opacity=".4"
            :width="sizeRect"
            :height="sizeRect"
            :x="-halfSizeRect"
            :y="-halfSizeRect"
        />
        <g v-if="cell.content !== null && cell.content.damage !== 0 && cell.content.damageMax < +Infinity">
            <rect :x="-size * 0.5" :y="-size * 0.65" :width="size" :height="size * 0.1" class="damage-bad" />
            <rect
                :x="-size * 0.5"
                :y="-size * 0.65"
                :height="size * 0.1"
                :width="(size * (cell.content.damageMax - cell.content.damage)) / cell.content.damageMax"
                class="damage-good"
            />
        </g>
        <rect
            v-if="visualFireIntensity !== 0"
            :fill="'url(#fire-' + visualFireIntensity + ')'"
            :width="sizeRect"
            :height="sizeRect"
            :x="-halfSizeRect"
            :y="-halfSizeRect"
        />
        <polygon v-if="disabled" :points="pathString" fill="#000" fill-opacity=".5" />
        <text v-if="debugMode" text-anchor="middle" dominant-baseline="middle" class="level-debug-text">
            {{ cell.position }}
        </text>
    </g>
</template>

<script lang="ts">
import Vue from 'vue';
import Fire from '@model/Fire';
import type Cell from '@model/Cell';

export default Vue.extend({
    components: {},
    props: {
        cell: { type: Object as () => Cell, required: true },
        size: { type: Number, required: true },
        disabled: Boolean,
        debugMode: Boolean,
    },
    data() {
        return {};
    },
    computed: {
        pathString: function () {
            return this.cell.position.getPathString(this.size);
        },
        x: function () {
            return this.cell.position.getCenterX(this.size);
        },
        y: function () {
            return this.cell.position.getCenterY(this.size);
        },
        sizeRect: function () {
            return 1.224744871 * this.size; // sqrt(6)/2 * size
        },
        halfSizeRect: function () {
            return 0.6123724357 * this.size; // sqrt(6)/4 * size
        },
        visualFireIntensity: function () {
            return Fire.intensityToFireCategory(this.cell.fireIntensity);
        },
    },
    methods: {
        click: function () {
            this.$emit('cell-clicked', this.cell.position);
        },
    },
});
</script>
