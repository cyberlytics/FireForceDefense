<template>
    <div>
        <img src="/assets/logo/logo.png" v-bind:alt="$t('FireForceDefense')"
             class="img-fluid" v-bind:style="'width: ' + width + ';'" />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {}
        },
        methods: {},
        components: {},
        props: {
            width: {
                type: String,
                default: '250px',
            }
        }
    })
</script>
