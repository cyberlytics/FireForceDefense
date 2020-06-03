<template>
    <div id="level-menu-modal" class="modal" ref="level-menu-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title h5">FireForceDefense</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <button class="btn btn-primary btn-block btn-lg" v-if="!confirm" @click="showConfirm">
                        Zurück zur Levelauswahl
                    </button>
                    <div v-if="confirm">
                        <p class="text-center">Level wirklich verlassen?</p>
                        <div class="d-flex flex-row justify-content-between">
                            <div>
                                <button class="btn btn-danger btn-block btn-lg" data-dismiss="modal" @click="back">
                                    Ja, zur Auswahl!
                                </button>
                            </div>
                            <div>
                                <button class="btn btn-success btn-block btn-lg" @click="hideConfirm">
                                    Nein, weiterspielen!
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr class="my-3" />
                    <button class="btn btn-primary btn-block btn-lg" data-dismiss="modal" aria-label="Close">
                        Weiterspielen
                    </button>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {
                confirm: false,
            }
        },
        methods: {
            showConfirm: function () {
                this.confirm = true;
            },
            hideConfirm: function () {
                this.confirm = false;
            },
            back: function () {
                this.$router.push('/world');
            }
        },
        components: {},
        props: []
    })
</script>
