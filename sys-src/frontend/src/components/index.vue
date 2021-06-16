<template>
    <div class="main-menu-bg">
        <div class="main-menu">
            <logo />
            <form name="form" @submit.prevent="handleLogin">
                <div class="input-group mb-3">
                    <div class="input-group-prepend w-50">
                        <label id="username" class="input-group-text w-100">E-Mail:</label>
                    </div>

                    <input
                        id="nickname"
                        v-model="username"
                        v-validate="'required'"
                        name="nickname"
                        type="text"
                        class="form-control"
                    />
                </div>

                <div class="input-group mb-3">
                    <div class="input-group-prepend w-50">
                        <label for="password" class="input-group-text w-100">{{ $t('Password') }}</label>
                    </div>

                    <input
                        id="Password"
                        v-model="password"
                        v-validate="'required'"
                        name="password"
                        type="password"
                        class="form-control"
                    />
                </div>

                <div class="mb-3">
                    <button type="submit" :disabled="loading" class="btn btn-primary btn-block btn-lg">
                        {{ $t('log in') }}
                    </button>
                </div>
                <div class="input-group">
                    <span v-if="errors.first('nickname')" class="alert-danger mb-3">{{ $t('E-mail required') }}</span>
                    <span v-if="errors.first('password')" class="alert-danger mb-3">{{ $t('Password required') }}</span>
                    <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                    </div>
                </div>

                <div class="mb-3">
                    <router-link class="" to="/authentification">{{ $t('Forgot password?') }}</router-link>
                </div>

                <hr class="mb-3" />

                <div class="mb-3">
                    <div>
                        <router-link class="btn btn-primary btn-block btn-lg" to="/registration">{{
                            $t('register')
                        }}</router-link>
                    </div>
                </div>
                <div class="mb-3">
                    <router-link class="" to="/credits">{{ $t('Credits') }}</router-link>
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
                    userService.login(user.getNickname(), user.getPassword()).then(
                        () => {
                            this.$router.push('/world');
                        },
                        (error) => {
                            this.loading = false;
                            this.message = error.response.data.message;
                        },
                    );
                }
            });
        },
    },
});
</script>
