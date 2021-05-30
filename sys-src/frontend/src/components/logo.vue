<template>
    <div>
        <img
            src="/assets/logo/logo.png"
            :alt="$t('FireForceDefense')"
            class="img-fluid"
            :style="'width: ' + width + ';'"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    components: {},
    props: {
        width: {
            type: String,
            default: '250px',
        },
    },
    data() {
        return {};
    },
    methods: {},
});
</script>
