<template>
    <div>
        <h1>{{ $t('FireForceDefense') }}</h1>
        <levelMap v-bind:level-map="game.getLevelMap()" />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Game from '../model/Game';
    import { router } from '../index';
    import levelMap from './levelMap.vue';

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
        methods: {},
        components: {
            levelMap,
        },
        props: ['levelID']
    })
</script>
