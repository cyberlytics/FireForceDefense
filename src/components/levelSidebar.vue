<template>
    <div id="level-view-sidebar">
        <div class="d-flex flex-row justify-content-between align-items-center mb-3 row-cols-3">
            <div class="d-flex justify-content-start">
                <div
                    class="bg-light p-2" id="money"
                    @mouseenter="setHelpText($t('Money: Description'))"
                    @mouseleave="setHelpText(null)"
                >
                    {{totalMoney}} <img src="/assets/utilites-Coin.svg" style="height: 1em;" alt="Coins"/>
                </div>
            </div>

            <div class="d-flex justify-content-center">
                <button
                    @click="activateEmergencyRelief"
                    :disabled="reliefGotActivated"
                    class="btn btn-info"
                    id="rain-emergency-relief"
                    @mouseenter="setHelpText($t('Relief: Description'))"
                    @mouseleave="setHelpText(null)"
                >
                    <img src="/assets/utilities-Nothilfe.svg" style="height: 3em;" alt="Rain"/>
                </button>
            </div>

            <div class="d-flex justify-content-end">
                <button
                    class="btn btn-light"
                    data-toggle="modal"
                    data-target="#level-menu-modal"
                    @mouseenter="setHelpText($t('Menu: Description'))"
                    @mouseleave="setHelpText(null)"
                >
                    <img src="/assets/utilities-menu_bttn.svg" style="height: 1em;" alt="Menu">
                </button>
            </div>
        </div>
        <div class="card my-2">
            <div class="card-body">
                <div class="d-flex justify-content-between mb-2">
                    <h2 class="card-title h5">Baumenü</h2>
                    <div
                        class="small-menu-card"
                        @click.stop="$emit('remove-selected')"
                        @mouseenter="setHelpText($t('Remove: Description'))"
                        @mouseleave="setHelpText(null)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                             height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                            <rect v-bind:fill="'url(#utility-Abbauen)'" height="100" width="100" x="0" y="0" />
                        </svg>
                    </div>
                </div>
                <div class="build-menu-cards">
                    <div
                        v-for="content in buildableContents"
                        class="build-menu-card"
                        @click.stop="$emit('content-selected', content)"
                        @mouseenter="setHelpText($t(new content().description))"
                        @mouseleave="setHelpText(null)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                             width="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" class="p-1">
                            <rect v-bind:fill="'url(#content-' + new content().id + ')'" height="100" width="100" x="0" y="0" />
                        </svg>
                        <div class="d-flex justify-content-end mt-1">
                            <div class="build-costs">{{ new content().buildCosts }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card my-2" id="help">
            <div class="card-body">
                <h2 class="card-title h5">Hilfe</h2>
                <p v-for="helpText in helpTexts" class="card-text">
                    {{ helpText }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {}
        },
        methods: {
            activateEmergencyRelief: function () {
                this.$emit('relief-clicked');
            },
            setHelpText(text: string|null) {
                this.$emit('set-help-text', text);
            },
        },
        components: {},
        props: ['buildableContents', 'reliefGotActivated', 'helpTexts', 'totalMoney', 'debugMode', 'modalId']
    })
</script>
