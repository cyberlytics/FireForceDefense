<template>
    <div id="level-view-sidebar" style="z-index: 100">
        <div class="d-flex flex-row justify-content-between align-items-center mb-3 row-cols-3">
            <div class="d-flex justify-content-start">
                <div
                    id="money"
                    class="bg-light p-2"
                    @mouseenter="setHelpText('Money: InGame currency for paying protective measures against fire.')"
                    @mouseleave="setHelpText(null)"
                >
                    {{ totalMoney }} <img src="/assets/utilities-Coin.svg" style="height: 1em" alt="Coins" />
                </div>
            </div>

            <div class="d-flex justify-content-center">
                <button
                    id="rain-emergency-relief"
                    :disabled="reliefGotActivated"
                    class="btn btn-card"
                    @click="activateEmergencyRelief"
                    @mouseenter="
                        setHelpText(
                            'Relief: Causes the clouds to give the complete level a rain shower. It\'s only one time use per level.',
                        )
                    "
                    @mouseleave="setHelpText(null)"
                >
                    <img src="/assets/utilities-Nothilfe.svg" style="height: 3em" alt="Rain" />
                </button>
            </div>

            <div class="d-flex justify-content-end">
                <button
                    class="btn btn-light"
                    data-toggle="modal"
                    :data-target="'#' + modalId"
                    @mouseenter="
                        setHelpText(
                            'Menu: Pauses the level and gives options to resume, to restart and to go back to the level selection.',
                        )
                    "
                    @mouseleave="setHelpText(null)"
                >
                    <img src="/assets/utilities-menu_bttn.svg" style="height: 1em" alt="Menu" />
                </button>
            </div>
        </div>
        <div class="card my-2">
            <div class="card-body">
                <div class="d-flex justify-content-between mb-2">
                    <h2 class="card-title h5">{{ $t('building menu') }}</h2>
                    <button
                        class="small-menu-card btn btn-card"
                        @click.stop="$emit('remove-selected')"
                        @mouseenter="
                            setHelpText(
                                'Remove: Removes an selected object on a cell to enable building a building and other fire fighting units.',
                            )
                        "
                        @mouseleave="setHelpText(null)"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            height="100%"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <rect :fill="'url(#utility-Abbauen)'" height="100" width="100" x="0" y="0" />
                        </svg>
                    </button>
                </div>
                <div class="build-menu-cards">
                    <button
                        v-for="content in buildableContents"
                        :key="content ? undefined : undefined"
                        class="build-menu-card btn btn-card"
                        @click.stop="$emit('content-selected', content)"
                        @mouseenter="setHelpText(new content().description)"
                        @mouseleave="setHelpText(null)"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="100%"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid meet"
                            class="p-1"
                        >
                            <rect
                                :fill="'url(#content-' + new content().id + ')'"
                                height="100"
                                width="100"
                                x="0"
                                y="0"
                            />
                        </svg>
                        <span class="d-flex justify-content-end mt-1">
                            <span class="build-costs">{{ new content().buildCosts }}</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div id="help" class="card my-2">
            <div class="card-body">
                <h2 class="card-title h5">{{ $t('help') }}</h2>
                <p v-for="helpText in helpTexts" :key="helpText" class="card-text">
                    {{ $t(helpText) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import type ContentDerivedType from '@model/ContentDerivedType';

export default Vue.extend({
    components: {},
    props: {
        buildableContents: { type: Array as () => ContentDerivedType[], required: true },
        reliefGotActivated: { type: Boolean },
        helpTexts: { type: Array as () => string[], required: true },
        totalMoney: { type: Number, required: true },
        debugMode: { type: Boolean },
        modalId: { type: String, required: true },
    },
    data() {
        return {};
    },
    methods: {
        activateEmergencyRelief: function () {
            this.$emit('relief-clicked');
        },
        setHelpText(text: string | null) {
            this.$emit('set-help-text', text);
        },
    },
});
</script>
