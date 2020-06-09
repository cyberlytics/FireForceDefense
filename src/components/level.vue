<template>
    <div id="level-view-container" @click="selfClick" @mousemove="mousemove">
        <levelSidebar v-bind:buildable-contents="buildableContents" v-on:content-selected="contentSelected" />
        <levelMap v-bind:level-map="game.getLevelMap()" v-on:cell-clicked="cellClicked" v-bind:game="game" />
        <levelModal />
        <previewCursor v-bind:content-to-build="game.contentToBuild" v-bind:mouse-x="mouseX" v-bind:mouse-y="mouseY" />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Game from '../model/Game';
    import { router } from '../index';
    import type HexPosition from '../model/HexPosition';
    import type Content from '../model/Content';
    import levelMap from './levelMap.vue';
    import levelSidebar from './levelSidebar.vue';
    import levelModal from './levelModal.vue';
    import previewCursor from './previewCursor.vue';

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
                mouseX: 0,
                mouseY: 0,
            }
        },
        methods: {
            selfClick: function() {
                this.game.contentToBuild = null;
            },
            mousemove: function(ev: MouseEvent) {
                this.mouseX = ev.clientX;
                this.mouseY = ev.clientY;
            },
            cellClicked: function (position: HexPosition) {
                this.game.placeAt(position);
                this.game.contentToBuild = null;

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
            previewCursor,
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
