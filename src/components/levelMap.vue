<template>
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             width="100%" height="100%" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMidYMid meet">
            <cellPatterns />
            <contentPatterns />
            <cell v-for="cell in levelMap.getAllCells()" v-bind:cell="cell" v-bind:key="cell.position.toString()"
                  v-bind:size="size" v-on:cell-clicked="cellClicked" v-bind:disabled="game.getCellDisabledFunction()(cell)" />
        </svg>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import cell from './cell.vue'
    import cellPatterns from './cellPatterns.vue';
    import contentPatterns from './contentPatterns.vue';
    import type HexPosition from '../model/HexPosition';

    export default Vue.extend({
        data() {
            return {
                size: 60
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
            cellPatterns,
            contentPatterns,
        },
        props: ['levelMap', 'game']
    })
</script>
