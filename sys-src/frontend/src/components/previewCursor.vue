<template>
    <svg
        v-if="contentToBuild !== null || removeMode"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="100px"
        height="100px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        class="position-absolute"
        :style="{ left: mouseX - 50 + 'px', top: mouseY - 50 + 'px' }"
        style="opacity: 0.7; pointer-events: none"
    >
        <rect
            v-if="contentToBuild !== null"
            :fill="'url(#content-' + new contentToBuild().id + ')'"
            height="100"
            width="100"
            x="0"
            y="0"
        />
        <rect v-else-if="removeMode" :fill="'url(#utility-Abbauen)'" height="100" width="100" x="0" y="0" />
    </svg>
</template>

<script lang="ts">
import Vue from 'vue';
import type ContentDerivedType from '@model/ContentDerivedType';

export default Vue.extend({
    components: {},
    props: {
        contentToBuild: { type: Object as () => ContentDerivedType, required: true },
        mouseX: { type: Number, required: true },
        mouseY: { type: Number, required: true },
        removeMode: { type: Boolean },
    },
    data() {
        return {};
    },
    methods: {},
});
</script>
