<template>
    <defs>
        <pattern
            v-for="category in ['1', '2', '3', '4']"
            :id="'fire-' + category"
            :key="'fire-' + category"
            width="1"
            height="1"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
        >
            <image x="0" y="0" :xlink:href="'/assets/fire_intensity' + category + '.svg'" width="100" height="100" />
        </pattern>
    </defs>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    components: {},
    data() {
        return {};
    },
    methods: {},
});
</script>
