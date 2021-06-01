<template>
    <div id="level-end-screen" ref="level-end-screen" class="modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 v-if="score === Score.UNLOCKED" class="modal-title h5">{{ $t('lost') }}</h2>
                    <h2 v-else class="modal-title h5">{{ $t('victory') }}</h2>
                </div>
                <div class="modal-body">
                    <div class="text-center">
                        <img
                            :src="'/assets/levelend_stars_' + stars + '.svg'"
                            :alt="stars + ' Sterne'"
                            style="height: 5.5rem"
                            class="mb-3"
                        />
                    </div>
                    <button
                        v-if="score !== Score.UNLOCKED && nextLevel !== null"
                        class="btn btn-primary btn-block btn-lg mb-3"
                        data-toggle="modal"
                        aria-label="Close"
                        data-dismiss="modal"
                        @click="$emit('next')"
                    >
                        {{ $t('next level') }}
                    </button>
                    <button
                        class="btn btn-primary btn-block"
                        :class="{ 'btn-lg': score === Score.UNLOCKED }"
                        data-toggle="modal"
                        aria-label="Close"
                        data-dismiss="modal"
                        @click="$emit('restart')"
                    >
                        {{ $t('new start') }}
                    </button>
                    <hr class="my-3" />
                    <button class="btn btn-primary btn-block btn-lg" data-dismiss="modal" @click="back">
                        {{ $t('back to level selection') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Score from '@model/Score';
import $ from 'jquery';

export default Vue.extend({
    components: {},
    props: {
        score: { type: Object as () => Score, required: false, default: null },
        nextLevel: { type: String, required: true },
    },
    data() {
        return {
            Score,
        };
    },
    computed: {
        stars: function () {
            switch (this.score) {
                case Score.UNLOCKED:
                    return 0;
                case Score.ONE_STAR:
                    return 1;
                case Score.TWO_STARS:
                    return 2;
                case Score.THREE_STARS:
                    return 3;
                default:
                    return 0;
            }
        },
    },
    watch: {
        score: function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            if (newValue === null) {
                $('#level-end-screen').modal('hide');
            } else {
                $('#level-end-screen').modal('show');
            }
        },
    },
    methods: {
        back: function () {
            this.$router.push('/world');
        },
    },
});
</script>
