<template>
    <div
        :style="{
            backgroundImage: `url('${image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
        }"
    >
        <effectAnimations />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="100%"
            height="100%"
            viewBox="-500 -500 1000 1000"
            preserveAspectRatio="xMidYMid meet"
        >
            <cellPatterns />
            <contentPatterns />
            <firePatterns />
            <utilityPatterns />
            <effectPatterns />
            <defs>
                <clipPath id="clipToCells">
                    <cellShape
                        v-for="cell in levelMap.getAllCells()"
                        :key="cell.position.toString()"
                        :cell="cell"
                        :size="size"
                    />
                </clipPath>
            </defs>
            <g id="levelMapCells">
                <cell
                    v-for="cell in levelMap.getAllCells()"
                    :key="cell.position.toString()"
                    :cell="cell"
                    :size="size"
                    :disabled="game.getCellDisabledFunction()(cell)"
                    :debug-mode="debugMode"
                    @cell-clicked="cellClicked"
                    @mouseenter-cell="mouseEnterCell(cell)"
                    @mouseleave-cell="mouseLeaveCell(cell)"
                />
            </g>
            <g id="extinguishVisualization" clip-path="url(#clipToCells)">
                <extinguishVisualization
                    v-for="cell in cellsWithExtinguish"
                    :key="cell.position.toString()"
                    :cell="cell"
                    :size="size"
                />
            </g>
            <g id="currentEffects" clip-path="url(#clipToCells)">
                <effect
                    v-for="effectExecution in currentEffects"
                    :key="effectExecution.id"
                    :effect-execution="effectExecution"
                    :size="size"
                    :debug-mode="debugMode"
                />
            </g>
            <g id="build-preview" clip-path="url(#clipToCells)">
                <rangePreview
                    v-if="previewRange > 0 && hovered !== null"
                    :size="size"
                    :position="hovered"
                    :range="previewRange"
                />
            </g>
        </svg>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import cell from './cell.vue';
import cellShape from './cellShape.vue';
import effect from './effect.vue';
import extinguishVisualization from './extinguishVisualization.vue';
import cellPatterns from './cellPatterns.vue';
import contentPatterns from './contentPatterns.vue';
import firePatterns from './firePatterns.vue';
import utilityPatterns from './utilityPatterns.vue';
import effectPatterns from './effectPatterns.vue';
import effectAnimations from './effectAnimations.vue';
import rangePreview from './rangePreview.vue';
import type HexPosition from '../model/HexPosition';
import type Cell from '../model/Cell';
import type LevelMap from '../model/LevelMap';
import type Game from '../model/Game';
import type EffectExecution from '../model/EffectExecution';

export default Vue.extend({
    components: {
        cell,
        cellShape,
        effect,
        extinguishVisualization,
        cellPatterns,
        contentPatterns,
        firePatterns,
        utilityPatterns,
        effectPatterns,
        effectAnimations,
        rangePreview,
    },
    props: {
        levelMap: { type: Object as () => LevelMap, required: true },
        game: { type: Object as () => Game, required: true },
        currentEffects: { type: Array as () => EffectExecution[], required: true },
        debugMode: { type: Boolean },
        previewRange: { type: Number, required: true },
    },
    data() {
        return {
            size: 60,
            image: '../../assets/img/levelBackground.png',
            hovered: null,
        };
    },
    computed: {
        cellsWithExtinguish: function () {
            return this.levelMap.getAllCells().filter((cell: Cell) => cell.content && cell.content.extinguishRate > 0);
        },
    },
    methods: {
        cellClicked: function (position: HexPosition) {
            this.$emit('cell-clicked', position);
        },
        mouseEnterCell: function (cell: Cell) {
            this.$emit('mouseenter-cell', cell);
            this.hovered = cell.position;
        },
        mouseLeaveCell: function (cell: Cell) {
            this.$emit('mouseleave-cell', cell);
            this.hovered = null;
        },
    },
});
</script>
