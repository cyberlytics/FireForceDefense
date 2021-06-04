<template>
    <div class="main-menu-bg">
        <div class="main-menu">
            <logo  />
            <form name="form" @submit.prevent="handleLogin">

            <div class="input-group mb-3 ">

                <div class="input-group-prepend w-50">
                    <label id="username" class="input-group-text w-100 ">Username</label>

                </div>

                <input name="nickname" type="text" v-model="user.username"  v-validate="'required'"  id="nickname" class="form-control"  />


            </div>

            <div class="input-group mb-3 " >
                <div class="input-group-prepend w-50">
                    <label for="password" class="input-group-text w-100 ">{{ $t('Password') }}</label>
                </div>

                <input name="password" type="password" id="Password" v-model="user.password" v-validate="'required'" class="form-control"/>
            </div>


            <div class="mb-3">
                <button type="submit"  class="btn btn-primary btn-block btn-lg" >
                    {{ $t('log in') }}
                </button>
            </div>
                <div class="input-group mb-3 ">
                    <span class="alert-danger mb-3">{{errors.first('nickname')}}</span>
                    <span class="alert-danger mb-3">{{errors.first('password')}}</span>
                    <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                    </div>
                </div>


            <div class="d-flex justify-content-between">
                <div class="mb-3">
                    <a class="link-secondary" href="#">{{ $t('Create new account?') }}</a>
                </div>
                <div class="mb-3">
                    <a class="link-secondary" href="#">{{ $t('Forgot password?') }}</a>
                </div>
            </div>


            <hr class="mb-3" />


            <router-link class="btn btn-primary btn-block btn-lg" to="/credits">{{ $t('Credits') }}</router-link>
            </form>
        </div>
    </div>
</template>




<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import logo from "./logo.vue";
const Auth = namespace("Auth");

@Component({
    components:{
        logo
    }
})
export default class Login extends Vue {


    private user: any = { username: "", password: "" };
    private loading: boolean = false;
    private message: string = "";

    @Auth.Getter
    private isLoggedIn!: boolean;

    @Auth.Action
    private login!: (data: any) => Promise<any>;

    created() {
        if (this.isLoggedIn) {
            this.$router.push("/world");
        }
    }

    handleLogin() {
        this.loading = true;
        this.$validator.validateAll().then((isValid : boolean) => {
            if (!isValid) {
                this.loading = false;
                return;
            }

            if (this.user.username && this.user.password) {
                this.login(this.user).then(
                    () => {
                        this.$router.push("/world");
                    },
                    (error:any) => {
                        this.loading = false;
                        this.message = error;
                    }
                );
            }
        });
    }
}

</script>
