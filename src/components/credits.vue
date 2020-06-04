<template>
    <div class="main-menu-bg">
        <div class="main-menu">
            <logo />
            <h2>Credits</h2>
            <p>Cameron Barbee</p>
            <p>Philipp Stangl</p>
            <p>Sebastian Schuscha</p>
            <p>Tobias Schotter</p>
            <p>Thomas Ammann</p>
            <p>Thomas Stangl</p>
            <hr class="mb-3" />
            <div>
                <router-link class="btn btn-primary btn-block btn-lg" to="/">zurück</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import logo from './logo.vue';

    export default Vue.extend({
        data() {
            return {}
        },
        methods: {},
        components: {
            logo,
        },
    })
</script>
