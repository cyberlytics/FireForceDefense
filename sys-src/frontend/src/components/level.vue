<template>
    <div id="level-view-container" class="overflow-hidden position-relative" @click="selfClick" @mousemove="mousemove">
        <levelSidebar
            :buildable-contents="buildableContents"
            :relief-got-activated="game.reliefGotActivated"
            :modal-id="modalId"
            :help-texts="helpTexts"
            :total-money="game.totalMoney"
            :debug-mode="debugMode"
            @content-selected="contentSelected"
            @relief-clicked="emergencyReliefClicked"
            @remove-selected="removeSelected"
            @set-help-text="setHelpText"
        />
        <levelMap
            :game="game"
            :level-map="game.getLevelMap()"
            :current-effects="game.currentEffects"
            :debug-mode="debugMode"
            :preview-range="previewRange"
            @cell-clicked="cellClicked"
            @mouseenter-cell="mouseEnterCell"
            @mouseleave-cell="mouseLeaveCell"
        />
        <levelModal :modal-id="modalId" @show="pause" @hide="resume" @restart="restart" />
        <levelEndScreen :score="game.score" :next-level="nextLevel" @next="next" @restart="restart" />
        <previewCursor
            :content-to-build="game.contentToBuild"
            :remove-mode="game.removeMode"
            :mouse-x="mouseX"
            :mouse-y="mouseY"
        />
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
import levelEndScreen from './levelEndScreen.vue';

export default Vue.extend({
    components: {
        levelMap,
        levelSidebar,
        levelModal,
        previewCursor,
        levelEndScreen,
    },
    beforeRouteLeave(to, from, next) {
        if (!this.game || this.game.score !== null) {
            next();
            return;
        }
        setTimeout(() => {
            if (!this.confirmedNavigation && !window.confirm('Ihre Änderungen werden eventuell nicht gespeichert.')) {
                this.confirmedNavigation = true;
                next(false);
                return;
            }
            next();
            return;
        }, 750);
    },
    props: {
        levelID: { type: String, required: true },
    },
    data() {
        let game: Game;
        try {
            game = new Game(this.levelID);
        } catch (e) {
            this.$router.push('/world');
        }
        let debugMode = localStorage.getItem('debugMode');

        const defaultHelpText = 'Default help text';

        return {
            game,
            buildableContents: Game.getBuildableContents(),
            mouseX: 0,
            mouseY: 0,
            modalId: 'level-menu-modal',
            defaultHelpText,
            helpTexts: [defaultHelpText],
            debugMode: debugMode ? debugMode === 'true' : false,
            confirmedNavigation: true,
        };
    },
    computed: {
        nextLevel: function () {
            const ld = LevelManager.getInstance().getNextLevel(this.game.levelDefinition);
            return ld === null ? null : ld.levelID;
        },
        previewRange: function () {
            if (this.game.contentToBuild) {
                const content = new this.game.contentToBuild();
                if (content.extinguishRate > 0) {
                    return content.extinguishRange;
                }
            }
            return 0;
        },
    },
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
        },
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
    methods: {
        selfClick: function () {
            this.game.contentToBuild = null;
            this.game.leaveRemoveMode();
        },
        mousemove: function (ev: MouseEvent) {
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
        mouseLeaveCell: function () {
            this.setExplainables([]);
        },
        setHelpText: function (text: string | null) {
            const explainables =
                text === null
                    ? []
                    : [
                          {
                              description: text,
                          },
                      ];
            this.setExplainables(explainables);
        },
        setExplainables: function (explainables: Explainable[]) {
            this.helpTexts = [];
            explainables.forEach((explainable) => {
                this.helpTexts.push(explainable.description);
            });
            if (this.helpTexts.length === 0) {
                this.helpTexts.push(this.defaultHelpText);
            }
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
            } else if (e.key === '#' && e.ctrlKey) {
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
        popstateHandler: function () {
            this.confirmedNavigation = false;
        },
    },
});
</script>
