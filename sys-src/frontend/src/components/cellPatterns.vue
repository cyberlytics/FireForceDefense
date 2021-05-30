<template>
    <defs>
        <pattern
            v-for="cell in cellTypes"
            :id="'cell-' + cell"
            :key="'cell-' + cell"
            width="1"
            height="1"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
        >
            <image x="0" y="0" :xlink:href="'/assets/cell-' + cell + '.svg'" width="100" height="100" />
        </pattern>
    </defs>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    components: {},
    data() {
        return {
            cellTypes: [
                'Abgebrannt',
                'Feld',
                'Gebirge',
                'Lavasee',
                'See',
                'Vulkangestein',
                'Waldboden',
                'Wiese',
                'Wueste',
            ],
        };
    },
    methods: {},
});
</script>
