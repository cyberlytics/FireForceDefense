<template>
    <div class="main-menu-bg">
        <div class="main-menu">
            <logo />
            <div>
                <h2 class="headlineRegistration">{{ $t('registration') }}</h2>
                <div class="mb-3">
                    <input :placeholder="$t('user name')" id="nickname" class="form-control inputFields"/>
                </div>
                <div class="mb-3">
                    <input :placeholder="$t('email')" type="email" id="email" class="form-control inputFields"/>
                </div>
                <div class="mb-3">
                    <input :placeholder="$t('password')" type="password" id="password" class="form-control inputFields"/>
                </div>
                <div class="mb-3">
                    <input :placeholder="$t('repeat password')" type="password" id="password2" class="form-control inputFields"/>
                </div>
                <hr class="mb-3" />
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary btn-block btn-lg">
                        {{ $t('register') }}
                    </button>
                </div>
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
