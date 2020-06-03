<template>
    <div class="main-menu-bg">
        <div class="main-menu">
            <h1>{{ $t('FireForceDefense') }}</h1>
            <svg width="100px" height="100px" class="mt-2 mb-4">
                <circle r="50%" cx="50%" cy="50%" stroke="#000" fill="transparent" />
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Logo</text>
            </svg>
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

    export default Vue.extend({
        data() {
            return {}
        },
        methods: {},
        components: {},
    })
</script>
