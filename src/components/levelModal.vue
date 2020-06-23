<template>
    <div v-bind:id="modalId" class="modal" ref="level-menu-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title h5">{{ $t('menu') }}</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="text-center">
                        {{ $t('Game is paused') }}
                    </div>
                    <hr class="my-3" />
                    <button class="btn btn-primary btn-block btn-lg" v-if="!backConfirm" @click="showBackConfirm">
                        {{ $t('back to level selection') }}
                    </button>
                    <confirm
                        v-if="backConfirm"
                        question="Really leave level?"
                        yes="Yes, back to world!"
                        no="No, continue playing!"
                        v-on:yes="back"
                        v-on:no="hide"
                    />
                    <hr class="my-3" />
                    <button class="btn btn-primary btn-block btn-lg" v-if="!restartConfirm" @click="showRestartConfirm">
                        {{ $t('Restart Level') }}
                    </button>
                    <confirm
                        v-if="restartConfirm"
                        question="Really restart?"
                        yes="Yes, restart!"
                        no="No, continue playing!"
                        v-on:yes="restart"
                        v-on:no="hide"
                    />
                    <hr class="my-3" />
                    <button class="btn btn-primary btn-block btn-lg" data-dismiss="modal" aria-label="Close">
                        {{ $t('continue playing') }}
                    </button>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import $ from 'jquery';
    import confirm from './confirm.vue';

    export default Vue.extend({
        data() {
            return {
                backConfirm: false,
                restartConfirm: false,
            }
        },
        methods: {
            showBackConfirm: function() {
                this.backConfirm = true;
            },
            showRestartConfirm: function() {
                this.restartConfirm = true;
            },
            back: function () {
                this.hide();
                this.$router.push('/world');
            },
            restart: function () {
                this.hide();
                this.$emit('restart');
            },
            hide: function () {
                $('#' + this.modalId).modal('hide');
            }
        },
        components: {
            confirm,
        },
        created: function () {
            $(window).on('show.bs.modal', (e) => {
                if ($('#' + this.modalId).is(e.target)) {
                    this.$emit('show');
                    this.backConfirm = false;
                    this.restartConfirm = false;
                }
            });
            $(window).on('hide.bs.modal', (e) => {
                if ($('#' + this.modalId).is(e.target)) {
                    this.$emit('hide');
                }
            });
        },
        props: ['modalId']
    })
</script>
