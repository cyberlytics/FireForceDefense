import './scss/main.scss';
import 'bootstrap';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import messages from './lang';
import locale from './locale';
import app from './app.vue';
import index from './components/index.vue';
import credits from './components/credits.vue';
import level from './components/level.vue';
import world from './components/world.vue';
import User from './model/User';
import VeeValidate from 'vee-validate';

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.config.productionTip = false;

Vue.use(VeeValidate);

const routes = [
    { path: "/", component: index },
    { path: "/credits", component: credits },
    { path: "/world", component: world },
    { path: "/level/:levelID", component: level, props: true },
];

export const router = new VueRouter({
    routes,
    mode: "history",
});

// Redirect to '/' when user is not logged in

router.beforeEach((to, from, next) => {
    const publicPages = ["/", "/credits"];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = User.getInstance().isLoggedIn();

    if (authRequired && !loggedIn) {
        return next({
            path: "/",
            query: { returnUrl: to.path },
        });
    }

    next();
});

const i18n = new VueI18n({
    locale: "de",
    fallbackLocale: "de",
    messages,
});

locale.setVueI18n(i18n);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const vm: Vue = new Vue({
    el: "#app",
    components: { app },
    template: "<app/>",
    router,
    i18n,
});
