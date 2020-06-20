<template>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
         v-if="contentToBuild !== null || removeMode"
         width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"
         class="position-absolute" v-bind:style="{left: (mouseX-50) + 'px', top: (mouseY-50) + 'px'}" style="opacity: .7; pointer-events: none">
        <rect v-if="contentToBuild !== null" v-bind:fill="'url(#content-' + new contentToBuild().id + ')'"
              height="100" width="100" x="0" y="0" />
        <rect v-else-if="removeMode" v-bind:fill="'url(#utility-Abbauen)'"
              height="100" width="100" x="0" y="0" />
    </svg>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {

            }
        },
        methods: {},
        components: {},
        props: ['contentToBuild', 'mouseX', 'mouseY', 'removeMode'],
    })
</script>
