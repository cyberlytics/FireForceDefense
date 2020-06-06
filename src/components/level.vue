<template>
    <div id="level-view-container" @click="selfClick">
        <level-sidebar v-bind:buildable-contents="buildableContents" v-on:content-selected="contentSelected" />
        <levelMap v-bind:level-map="game.getLevelMap()" v-bind:content-to-build="game.contentToBuild" v-on:cell-clicked="cellClicked" />
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
    import type Content from '../model/Content';

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
                buildableContents: Game.getBuildableContents(),
            }
        },
        methods: {
            selfClick: function() {
                this.game.contentToBuild = null;
            },
            cellClicked: function (position: HexPosition) {
                // TODO Replace with real code
                console.log('Level observed cell click at ' + position.toString());
            },
            contentSelected: function (content: Content) {
                this.game.contentToBuild = content;
            },
        },
        components: {
            levelMap,
            levelSidebar,
            levelModal,
        },
        props: ['levelID'],
        created() {
            window.addEventListener('keydown', (e) => {
                if (e.key == 'Escape') {
                    this.game.contentToBuild = null;
                }
            });
        },
    })
</script>
