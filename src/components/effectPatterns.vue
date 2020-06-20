<template>
    <defs>
        <pattern v-for="effect in ['Feuer1', 'Feuer2', 'Feuer3', 'Feuerball', 'Gewitter', 'Lava', 'Regen']"
                 v-bind:id="'effect-' + effect" width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <use v-bind:xlink:href="'#animation-effect-' + effect" x="0" y="0" width="100" height="100" />
        </pattern>
    </defs>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {}
        },
        methods: {},
        components: {
        },
    })
</script>
