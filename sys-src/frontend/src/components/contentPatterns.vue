<template>
    <defs>
        <pattern
            v-for="content in contentTypes"
            :id="'content-' + content"
            :key="'content-' + content"
            width="1"
            height="1"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
        >
            <image x="0" y="0" :xlink:href="'/assets/content-' + content + '.svg'" width="100" height="100" />
        </pattern>
    </defs>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    components: {},
    data() {
        return {
            contentTypes: [
                'Loeschkran',
                'Loeschschiff',
                'Loeschzeppelin',
                'Loeschtrupp',
                'Loeschturm',
                'Basis',
                'Haus',
                'Baumgruppe',
                'Steinbrocken',
                'Brandreste',
                'Totholz',
            ],
        };
    },
    methods: {},
});
</script>
