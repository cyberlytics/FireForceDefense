<template>
    <div class="main-menu-bg">
        <div class="main-menu">
            <logo />
            <div class="mb-3">
                <div>
                    <router-link class="btn btn-primary btn-block btn-lg" to="/">{{ $t('log in') }}</router-link>
                </div>
            </div>
            <div class="mb-3">
                <div>
                    <router-link class="btn btn-primary btn-block btn-lg" to="/registration">{{ $t('register') }}</router-link>
                </div>
            </div>
            <hr class="mb-3" />
            <div>
                <router-link class="btn btn-primary btn-block btn-lg" to="/credits">{{ $t('Credits') }}</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import User from '@model/User';
import logo from './logo.vue';

export default Vue.extend({
    components: {
        logo,
    },
    data() {
        return {
            nickname: '',
            requiredMessage: false,
        };
    },
    methods: {
        setNickname: function () {
            if (this.nickname !== '') {
                const user = User.getInstance();
                user.login(this.nickname);
                this.$router.push('/world');
            } else {
                this.requiredMessage = true;
            }
        },
    },
});
</script>
