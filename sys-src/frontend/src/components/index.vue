<template>
    <div class="main-menu-bg">
        <div class="main-menu">
            <logo />
            <form name="form" @submit.prevent="handleLogin">
                <div class="input-group mb-3">
                    <input
                        id="username"
                        v-model="username"
                        v-validate="'required'"
                        :placeholder="$t('user name') + '/' + $t('email')"
                        name="username"
                        type="text"
                        required
                        class="form-control inputFields"
                    />
                </div>
                <div class="mb-3">
                    <span v-if="errors.first('username')" class="infoBox mb-3">{{ $t('E-mail required') }}</span>
                </div>

                <div class="input-group mb-3">
                    <input
                        id="Password"
                        v-model="password"
                        v-validate="'required'"
                        :placeholder="$t('password')"
                        name="password"
                        type="password"
                        required
                        class="form-control inputFields"
                    />
                </div>
                <div class="mb-3">
                    <span v-if="errors.first('password')" class="infoBox mb-3">{{ $t('Password required') }}</span>
                </div>

                <div class="mb-3">
                    <button type="submit" :disabled="loading" class="btn btn-primary btn-block btn-lg">
                        {{ $t('log in') }}
                    </button>
                </div>
                <div v-if="message" class="alert alert-danger" role="alert">
                    {{ message }}
                </div>

                <router-link class="" to="/authentification">{{ $t('Forgot password?') }} </router-link>
                ·
                <router-link class="" to="/registration">{{ $t('register') }}</router-link>
                <hr class="mb-3" />
                <div>
                    <router-link class="btn btn-primary btn-block btn-lg" to="/credits">{{
                        $t('Credits')
                    }}</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { userService } from '@services/user.service';
import logo from './logo.vue';
import User from '@model/User';

export default Vue.extend({
    components: {
        logo,
    },

    data() {
        return {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: '',
            message: '',
        };
    },
    created() {
        if (this.isLoggedIn) {
            this.$router.push('/world');
        }
    },
    methods: {
        handleLogin() {
            const user = User.getInstance();
            user.login(this.username, this.password);
            this.loading = true;
            this.$validator.validateAll().then((isValid: boolean) => {
                if (!isValid) {
                    this.loading = false;
                    return;
                }

                if (this.username && this.password) {
                    userService.login(user.getUsername(), user.getPassword()).then(
                        () => {
                            this.$router.push('/world');
                        },
                        (error) => {
                            this.loading = false;
                            this.message = error;
                        },
                    );
                }
            });
        },
    },
});
</script>
