<template>
    <div class="main-menu-bg">
        <div class="main-menu">
            <logo />
            <div v-if="requiredMessage" class="text-danger">{{ $t('Please enter nickname') }}</div>

            <div class="input-group mb-3 ">
                <label for="nickname" class="input-group-text">{{$t("Nickname")}}</label>
                <input id="nickname" v-model="nickname" class="form-control" @keyup.enter="setNickname" />

            </div>
            <div class="input-group mb-3 " >
                <label for="password" class="input-group-text">Passwort:</label>
                <input type="password" id="Password" v-model="password" class="form-control"/>
            </div>

            <div class="mb-3">
                <button type="submit" class="btn btn-primary btn-block btn-lg" @click="setNickname">
                    {{ $t('log in') }}
                </button>
            </div>
            <div class="d-flex justify-content-between">
                <div class="mb-3">
                    <a class="link-secondary" href="#">Neuen Account erstellen?</a>
                </div>
                <div class="mb-3">
                    <a class="link-secondary" href="#">Passwort vergessen?</a>
                </div>
            </div>


            <hr class="mb-3" />


            <router-link class="btn btn-primary btn-block btn-lg" to="/credits">{{ $t('Credits') }}</router-link>

        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import User from '../model/User';
import logo from './logo.vue';

export default Vue.extend({
    components: {
        logo,
    },
    data() {
        return {
            nickname: '',
            password: '',
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
