<template>
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
             width="100%" height="500px" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMidYMid meet">
            <cellPatterns />
            <cell v-for="cell in levelMap.getAllCells()" v-bind:cell="cell" v-bind:key="cell.position.toString()"
                  v-bind:size="size" />
        </svg>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import cell from './cell.vue'
    import cellPatterns from './cellPatterns.vue';

    export default Vue.extend({
        data() {
            return {
                size: 70
            }
        },
        methods: {},
        components: {
            cell,
            cellPatterns
        },
        props: ['levelMap']
    })
</script>
