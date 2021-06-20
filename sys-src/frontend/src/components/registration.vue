<template>
    <div class="main-menu-bg">
        <div class="main-menu">
            <logo />
            <div>
                <h5 class="headlineRegistration">{{ $t('registration') }}</h5>
                <form name="form" @submit.prevent="handleRegister">
                    <div class="mb-3">
                        <input
                            id="username"
                            v-model="name"
                            :class="{ falseInput: isFalseName }"
                            :placeholder="$t('user name')"
                            required
                            class="form-control inputFields"
                            @input="validateName"
                        />
                    </div>
                    <div v-if="msg.name" :class="{ infoBox: isFalseName }" class="mb-3">
                        {{ msg.name }}
                    </div>
                    <div class="mb-3">
                        <input
                            id="email"
                            v-model="email"
                            :class="{ falseInput: isFalseMail }"
                            :placeholder="$t('email')"
                            type="email"
                            required
                            class="form-control inputFields"
                            @input="validateEmail"
                        />
                    </div>
                    <div v-if="msg.mail" :class="{ infoBox: isFalseMail }" class="mb-3">
                        {{ msg.mail }}
                    </div>
                    <div class="mb-3">
                        <input
                            id="password"
                            v-model="pw1"
                            :class="{ falseInput: isFalsePw }"
                            :placeholder="$t('password')"
                            type="password"
                            required
                            class="form-control inputFields"
                            @input="comparePasswords"
                        />
                    </div>
                    <div class="mb-3">
                        <input
                            id="password2"
                            v-model="pw2"
                            :class="{ falseInput: isFalsePw }"
                            :placeholder="$t('repeat password')"
                            type="password"
                            required
                            class="form-control inputFields"
                            @input="comparePasswords"
                        />
                    </div>
                    <div v-if="msg.pw" :class="{ infoBox: isFalsePw }" class="mb-3">
                        {{ msg.pw }}
                    </div>
                    <hr class="mb-3" />
                    <div class="mb-3">
                        <button type="submit" :disabled="loading" class="btn btn-primary btn-block btn-lg">
                            {{ $t('register') }}
                        </button>
                    </div>
                    <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import logo from './logo.vue';
import User from "@model/User";
import {userService} from "@services/user.service";

export default Vue.extend({
    components: {
        logo,
    },
    data() {
        return {
            email: '',
            name: '',
            pw1: '',
            pw2: '',
            msg: [],
            isFalseMail: false,
            isFalsePw: false,
            isFalseName: false,
            loading: false,
            error: '',
            message: '',
        };
    },
    methods: {
        validateEmail() {
            if (
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    this.email,
                )
            ) {
                this.isFalseMail = false;
                this.msg['mail'] = '';
            } else {
                if (this.email === '') {
                    this.isFalseMail = false;
                    this.msg['mail'] = '';
                } else {
                    this.isFalseMail = true;
                    this.msg['mail'] = this.$t('wrong email');
                }
            }
        },
        validateName() {
            if (/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(this.name)) {
                this.isFalseName = false;
                this.msg['name'] = '';
            } else {
                if (this.name === '') {
                    this.isFalseName = false;
                    this.msg['name'] = '';
                } else {
                    this.isFalseName = true;
                    this.msg['name'] = this.$t('wrong user name');
                }
            }
        },

        comparePasswords() {
            if (this.pw1.toString() == this.pw2.toString()) {
                this.isFalsePw = false;
                this.msg['pw'] = '';
            } else {
                this.isFalsePw = true;
                this.msg['pw'] = this.$t('passwords not matching');
            }
        },
        handleRegister() {
            const user = User.getInstance();
            user.register(this.name, this.email, this.pw1);
            this.loading = true;

                if (this.isFalseMail || this.isFalsePw || this.isFalseName) {
                    this.loading = false;
                    return;
                }

                if (this.name && this.email && this.pw1) {
                    userService.register(user.getUsername(), user.getEmail(), user.getPassword()).then(
                        () => {
                            this.$router.push('/world');
                        },
                        (error) => {
                            this.loading = false;
                            this.message = error;
                        },
                    );
                }
        },
    },
});
</script>
