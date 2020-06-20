<template>
    <div id="level-view-container" @click="selfClick" @mousemove="mousemove">
        <levelSidebar
            v-bind:buildable-contents="buildableContents"
            v-bind:relief-got-activated="game.reliefGotActivated"
            v-bind:help-texts="helpTexts"
            v-bind:total-money="game.totalMoney"
            v-on:content-selected="contentSelected"
            v-on:relief-clicked="emergencyReliefClicked"
            v-on:remove-selected="removeSelected"
            v-on:set-help-text="setHelpText"
        />
        <levelMap
            v-bind:game="game"
            v-bind:level-map="game.getLevelMap()"
            v-bind:current-effects="game.currentEffects"
            v-on:cell-clicked="cellClicked"
            v-on:mouseenter-cell="mouseenterCell"
            v-on:mouseleave-cell="mouseleaveCell"
        />
        <levelModal />
        <levelEndScreen v-on:next="next" v-on:restart="restart" v-bind:score="game.score" v-bind:next-level="nextLevel" />
        <previewCursor v-bind:content-to-build="game.contentToBuild" v-bind:remove-mode="game.removeMode"
                       v-bind:mouse-x="mouseX" v-bind:mouse-y="mouseY" />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Game from '../model/Game';
    import LevelManager from '../model/LevelManager';
    import { router } from '../index';
    import type HexPosition from '../model/HexPosition';
    import type Content from '../model/Content';
    import levelMap from './levelMap.vue';
    import levelSidebar from './levelSidebar.vue';
    import levelModal from './levelModal.vue';
    import previewCursor from './previewCursor.vue';
    import type Cell from '../model/Cell';
    import type Explainable from '../model/Explainable';
    import levelEndScreen from "./levelEndScreen.vue";
    import $ from 'jquery';

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
                helpTexts: [],
            }
        },
        methods: {
            selfClick: function() {
                this.game.contentToBuild = null;
                this.game.leaveRemoveMode();
            },
            mousemove: function(ev: MouseEvent) {
                this.mouseX = ev.clientX;
                this.mouseY = ev.clientY;
            },
            cellClicked: function (position: HexPosition) {
                this.game.placeAt(position);
                this.game.removeAt(position);
                this.game.contentToBuild = null;
                this.game.leaveRemoveMode();
                this.mouseenterCell(this.game.getLevelMap().getCellAt(position));

                // TODO Replace with real code
                console.log('Level observed cell click at ' + position.toString());
            },
            contentSelected: function (content: Content) {
                this.game.contentToBuild = content;
            },
            removeSelected: function () {
                this.game.enterRemoveMode();
            },
            emergencyReliefClicked: function () {
                this.game.emergencyRelief();
            },
            mouseenterCell: function (cell: Cell) {
                const explainables: Explainable[] = [cell];
                if (cell.content) {
                    explainables.push(cell.content);
                }
                this.setExplainables(explainables);
            },
            mouseleaveCell: function (cell: Cell) {
                this.setExplainables([]);
            },
            setHelpText: function(text: string|null) {
                const explainables = text === null ? [] : [{
                    description: text,
                }]
                this.setExplainables(explainables);
            },
            setExplainables: function (explainables: Explainable[]) {
                this.helpTexts = [];
                explainables.forEach((explainable) => {
                    this.helpTexts.push(explainable.description);
                })
            },
            restart: function () {
                this.game = new Game(this.game.levelDefinition.levelID);
            },
            next: function () {
                if (this.nextLevel !== null) {
                    this.$router.push({ path: `/level/${this.nextLevel}` });
                }
            },
        },
        computed: {
            nextLevel: function () {
                const ld = LevelManager.getInstance().getNextLevel(this.game.levelDefinition)
                return ld === null ? null : ld.levelID;
            }
        },
        components: {
            levelMap,
            levelSidebar,
            levelModal,
            previewCursor,
            levelEndScreen,
        },
        props: ['levelID'],
        watch: {
            levelID: function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                this.game = new Game(newValue);
            }
        },
        created() {
            window.addEventListener('keydown', (e) => {
                if (e.key == 'Escape') {
                    this.game.contentToBuild = null;
                }
            });
            window.addEventListener('beforeunload', function(event) {
                event.returnValue = '';
            })
        },
        beforeDestroy() {
            this.game.pause();
        },
        beforeRouteLeave(to, from, next) {
            if (this.game.score === null && !window.confirm("Ihre Änderungen werden eventuell nicht gespeichert.")) {
                return;
            }
            next();
        }
    })
</script>
