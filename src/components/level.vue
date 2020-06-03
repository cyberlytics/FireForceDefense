<template>
    <div id="level-view-container">
        <level-sidebar />
        <levelMap v-bind:level-map="game.getLevelMap()" v-on:cell-clicked="cellClicked" />
        <level-modal />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Game from '../model/Game';
    import { router } from '../index';
    import type HexPosition from '../model/HexPosition';
    import levelMap from './levelMap.vue';
    import levelSidebar from './levelSidebar.vue';
    import levelModal from './levelModal.vue';

    export default Vue.extend({
        data() {
            let game: Game;
            try {
                game = new Game(this.levelID);
            } catch (e) {
                router.push('/');
            }
            console.log('data() called'); // TODO remove
            return {
                game,
            }
        },
        methods: {
            cellClicked: function (position: HexPosition) {
                // TODO Replace with real code
                console.log('Level observed cell click at ' + position.toString());
            }
        },
        components: {
            levelMap,
            levelSidebar,
            levelModal,
        },
        props: ['levelID']
    })
</script>
