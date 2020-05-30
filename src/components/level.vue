<template>
    <div>
        <h1>{{ $t('FireForceDefense') }}</h1>
        <levelMap v-bind:level-map="game.getLevelMap()" v-on:cell-clicked="cellClicked" />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Game from '../model/Game';
    import { router } from '../index';
    import levelMap from './levelMap.vue';
    import type HexPosition from '../model/HexPosition';

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
        },
        props: ['levelID']
    })
</script>
