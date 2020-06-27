<template>
    <div id="level-view-container" @click="selfClick" @mousemove="mousemove">
        <levelSidebar
            v-bind:buildable-contents="buildableContents"
            v-bind:relief-got-activated="game.reliefGotActivated"
            v-bind:modal-id="modalId"
            v-bind:help-texts="helpTexts"
            v-bind:total-money="game.totalMoney"
            v-bind:debug-mode="debugMode"
            v-on:content-selected="contentSelected"
            v-on:relief-clicked="emergencyReliefClicked"
            v-on:remove-selected="removeSelected"
            v-on:set-help-text="setHelpText"
        />
        <levelMap
            v-bind:game="game"
            v-bind:level-map="game.getLevelMap()"
            v-bind:current-effects="game.currentEffects"
            v-bind:debug-mode="debugMode"
            v-bind:preview-range="previewRange"
            v-on:cell-clicked="cellClicked"
            v-on:mouseenter-cell="mouseEnterCell"
            v-on:mouseleave-cell="mouseLeaveCell"
        />
        <levelModal
            v-bind:modal-id="modalId"
            v-on:show="pause"
            v-on:hide="resume"
            v-on:restart="restart"
        />
        <levelEndScreen v-on:next="next" v-on:restart="restart" v-bind:score="game.score" v-bind:next-level="nextLevel" />
        <previewCursor v-bind:content-to-build="game.contentToBuild" v-bind:remove-mode="game.removeMode"
                       v-bind:mouse-x="mouseX" v-bind:mouse-y="mouseY" />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Game from '../model/Game';
    import LevelManager from '../model/LevelManager';
    import type HexPosition from '../model/HexPosition';
    import type Content from '../model/Content';
    import levelMap from './levelMap.vue';
    import levelSidebar from './levelSidebar.vue';
    import levelModal from './levelModal.vue';
    import previewCursor from './previewCursor.vue';
    import type Cell from '../model/Cell';
    import type Explainable from '../model/Explainable';
    import levelEndScreen from "./levelEndScreen.vue";

    export default Vue.extend({
        data() {
            let game: Game;
            try {
                game = new Game(this.levelID);
            } catch (e) {
                this.$router.push('/world');
            }
            let debugMode = localStorage.getItem('debugMode');

            return {
                game,
                buildableContents: Game.getBuildableContents(),
                mouseX: 0,
                mouseY: 0,
                modalId: 'level-menu-modal',
                helpTexts: [],
                debugMode: debugMode ? debugMode === 'true' : false,
                confirmedNavigation: true,
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
                this.mouseEnterCell(this.game.getLevelMap().getCellAt(position));
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
            mouseEnterCell: function (cell: Cell) {
                const explainables: Explainable[] = [cell];
                if (cell.content) {
                    explainables.push(cell.content);
                }
                this.setExplainables(explainables);
            },
            mouseLeaveCell: function (cell: Cell) {
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
            pause: function () {
                this.game.pause();
            },
            resume: function () {
                this.game.resume();
            },
            keydownHandler: function (e: KeyboardEvent) {
                if (e.key === 'Escape') {
                    this.game.contentToBuild = null;
                    this.game.leaveRemoveMode();
                } else if (e.key == '#' && e.ctrlKey) {
                    this.debugMode = !this.debugMode;
                    localStorage.setItem('debugMode', this.debugMode);
                    e.preventDefault();
                }
            },
            beforeunloadHandler: function (e: BeforeUnloadEvent) {
                if (this.game.score === null) {
                    e.preventDefault();
                    e.returnValue = '';
                }
            },
            popstateHandler: function (e: PopStateEvent) {
                this.confirmedNavigation = false;
            }
        },
        computed: {
            nextLevel: function () {
                const ld = LevelManager.getInstance().getNextLevel(this.game.levelDefinition)
                return ld === null ? null : ld.levelID;
            },
            previewRange: function () {
                if (this.game.contentToBuild) {
                    const content = new this.game.contentToBuild;
                    if (content.extinguishRate > 0) {
                        return content.extinguishRange;
                    }
                }
                return 0;
            },
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
            },
            'game.isPlayable': function (newValue) {
                if (newValue === false) {
                    this.$router.push('/world');
                }
            }
        },
        created() {
            window.addEventListener('keydown', this.keydownHandler);
            window.addEventListener('beforeunload', this.beforeunloadHandler);
            window.addEventListener('popstate', this.popstateHandler);
            console.log('Use Ctrl+# to enter the debug mode.');
        },
        beforeDestroy() {
            window.removeEventListener('keydown', this.keydownHandler);
            window.removeEventListener('beforeunload', this.beforeunloadHandler);
            window.removeEventListener('popstate', this.popstateHandler);
            this.game.pause();
        },
        beforeRouteLeave(to, from, next) {
            if (!this.game || this.game.score !== null) {
                next();
                return;
            }
            setTimeout(() => {
                if (!this.confirmedNavigation && !window.confirm("Ihre Änderungen werden eventuell nicht gespeichert.")) {
                    this.confirmedNavigation = true;
                    next(false);
                    return;
                }
                next();
                return;
            }, 750);
        }
    })
</script>
