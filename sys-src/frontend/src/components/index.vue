<template>
    <div class="main-menu-bg">
        <div class="main-menu">
            <logo />
            <form name="form" @submit.prevent="handleLogin">
                <div class="input-group mb-3">
                    <input
                        id="username"
                        v-model="username"
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
                    <button type="submit" class="btn btn-primary btn-block btn-lg">
                        {{ $t('log in') }}
                    </button>
                </div>
                <div v-if="message" class="alert alert-danger" role="alert">
                    {{ message }}
                </div>

                <router-link class="" to="/">{{ $t('Forgot password?') }} </router-link>
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
            this.$validator.validateAll().then((isValid: boolean) => {
                if (!isValid) {
                    return;
                }

                if (this.username && this.password) {
                    userService.login(user.getUsername(), user.getPassword()).then(
                        () => {
                            this.$router.push('/world');
                        },
                        (error) => {
                            this.message = /<pre>(.*?)<\/pre>/g
                                .exec(error.response.data)[0]
                                .replace(/<\/?pre>/g, '')
                                .replace(/&\/?quot;/g, '');
                        },
                    );
                }
            });
        },
    },
});
</script>
