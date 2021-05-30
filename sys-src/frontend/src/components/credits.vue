<template>
    <div class="main-menu-bg">
        <div class="main-menu">
            <logo />
            <h2>{{ $t('Credits') }}</h2>
            <p>Cameron Barbee</p>
            <p>Philipp Stangl</p>
            <p>Sebastian Schuscha</p>
            <p>Thomas Ammann</p>
            <p>Thomas Stangl</p>
            <p>Tobias Schotter</p>
            <hr class="mb-3" />
            <p class="small">
                Feuerball-Animation: CC BY 4.0 by "EK"<br />
                <a href="https://lottiefiles.com/13581-dancing-fire">https://lottiefiles.com/13581-dancing-fire</a>
            </p>
            <hr class="mb-3" />
            <div>
                <router-link class="btn btn-primary btn-block btn-lg" to="/">{{ $t('back') }}</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import logo from './logo.vue';

export default Vue.extend({
    components: {
        logo,
    },
    data() {
        return {};
    },
    methods: {},
});
</script>
