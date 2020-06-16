<template>
    <polygon
        v-bind:transform="'translate(' + x + ',' + y + ')'"
        v-bind:points="pathString"
    />
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {}
        },
        methods: {},
        components: {},
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
        props: ['cell', 'size']
    })
</script>
