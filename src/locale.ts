import type VueI18n from 'vue-i18n';

class Locale {
    private vueI18n: VueI18n;

    constructor() {
        if (!localStorage.getItem('locale')) {
            localStorage.setItem('locale', navigator.language.slice(0, 2));
        }
    }

    setVueI18n(vueI18n: VueI18n) {
        this.vueI18n = vueI18n;
        this.vueI18n.locale = localStorage.getItem('locale');
    }

    set(val: string) {
        localStorage.setItem('locale', val);
        if (this.vueI18n) {
            this.vueI18n.locale = val;
        }
    }

    get(): string {
        if (this.vueI18n) {
            return this.vueI18n.locale;
        } else {
            return localStorage.getItem('locale');
        }
    }
}

export default new Locale();
