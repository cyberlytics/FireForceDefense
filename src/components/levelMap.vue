<template>
    <div :style="{
        backgroundImage: `url('${image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
    }">
        <effectAnimations />
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             width="100%" height="100%" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMidYMid meet">
            <cellPatterns />
            <contentPatterns />
            <firePatterns />
            <utilityPatterns />
            <effectPatterns />
            <defs>
                <clipPath id="clipToCells">
                    <cellShape
                        v-for="cell in levelMap.getAllCells()"
                        v-bind:cell="cell" v-bind:key="cell.position.toString()"
                        v-bind:size="size"
                    />
                </clipPath>
            </defs>
            <g id="levelMapCells">
                <cell
                    v-for="cell in levelMap.getAllCells()"
                    v-bind:cell="cell" v-bind:key="cell.position.toString()"
                    v-bind:size="size"
                    v-bind:disabled="game.getCellDisabledFunction()(cell)"
                    v-bind:debug-mode="debugMode"
                    v-on:cell-clicked="cellClicked"
                    v-on:mouseenter-cell="$emit('mouseenter-cell', cell)"
                    v-on:mouseleave-cell="$emit('mouseleave-cell', cell)"
                />
            </g>
            <g id="extinguishVisualization" clip-path="url(#clipToCells)">
                <extinguishVisualization
                    v-for="cell in levelMap.getAllCells()"
                    v-if="cell.content && cell.content.extinguishRate > 0"
                    v-bind:cell="cell" v-bind:key="cell.position.toString()"
                    v-bind:size="size"
                />
            </g>
            <g id="currentEffects" clip-path="url(#clipToCells)">
                <effect
                    v-for="effectExecution in currentEffects"
                    v-bind:effect-execution="effectExecution"
                    v-bind:key="effectExecution.id"
                    v-bind:size="size"
                    v-bind:debug-mode="debugMode"
                />
            </g>
        </svg>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import cell from './cell.vue'
    import cellShape from './cellShape.vue'
    import effect from './effect.vue'
    import extinguishVisualization from './extinguishVisualization.vue';
    import cellPatterns from './cellPatterns.vue';
    import contentPatterns from './contentPatterns.vue';
    import firePatterns from './firePatterns.vue';
    import utilityPatterns from './utilityPatterns.vue';
    import effectPatterns from './effectPatterns.vue';
    import effectAnimations from './effectAnimations.vue';
    import type HexPosition from '../model/HexPosition';

    export default Vue.extend({
        data() {
            return {
                size: 60,
                image: '../../assets/img/levelBackground.png'
            }
        },
        methods: {
            cellClicked: function (position: HexPosition) {
                // TODO Replace with real code
                console.log('Level map observed cell click at ' + position.toString());

                this.$emit('cell-clicked', position);
            }
        },
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
        },
        props: ['levelMap', 'game', 'currentEffects', 'debugMode']
    })
</script>
