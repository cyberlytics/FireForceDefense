<template>
    <div class="main-menu-bg">
        <div class="main-menu">
            <h1>{{ $t('FireForceDefense') }}</h1>
            <svg width="100px" height="100px" class="mt-2 mb-4">
                <circle r="50%" cx="50%" cy="50%" stroke="#000" fill="transparent" />
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Logo</text>
            </svg>
            <div class="text-danger" v-if="requiredMessage">{{ $t('Please enter nickname') }}</div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label for="nickname" class="input-group-text">Nickname:</label>
                </div>
                <input id="nickname" class="form-control" v-model="nickname" />
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-primary btn-block btn-lg" @click="setNickname">Anmelden</button>
            </div>
            <hr class="mb-3" />
            <div>
                <router-link class="btn btn-primary btn-block btn-lg" to="/credits">Credits</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import User from '../model/User';

    export default Vue.extend({
        data() {
            return {
                nickname: '',
                requiredMessage: false,
            }
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
            }
        },
        components: {},
    })
</script>
