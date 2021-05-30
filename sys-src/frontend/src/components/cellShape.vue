<template>
    <polygon :transform="'translate(' + x + ',' + y + ')'" :points="pathString" />
</template>

<script lang="ts">
import Vue from 'vue';
import type Cell from '../model/Cell';

export default Vue.extend({
    components: {},
    props: {
        cell: { type: Object as () => Cell, required: true },
        size: { type: Number, required: true },
    },
    data() {
        return {};
    },
    computed: {
        pathString: function () {
            return this.cell.position.getPathString(this.size);
        },
        x: function () {
            return this.cell.position.getCenterX(this.size);
        },
        y: function () {
            return this.cell.position.getCenterY(this.size);
        },
    },
    methods: {},
});
</script>
