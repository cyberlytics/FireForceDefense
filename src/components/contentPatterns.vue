<template>
    <defs>
        <pattern v-for="content in ['Drehleiter', 'Loeschschiff', 'Baumgruppe', 'Steinbrocken', 'Basis', 'Haus']"
            v-bind:id="'content-' + content" width="1" height="1" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <image x="0" y="0" v-bind:xlink:href="'/assets/content-' + content + '.svg'" width="100" height="100" />
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
        components: {},
    })
</script>
