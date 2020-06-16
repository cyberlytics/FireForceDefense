<template>
    <div id="level-end-screen" class="modal" ref="level-end-screen">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 v-if="win" class="modal-title h5">Gewonnen</h2>
                    <h2 v-if="lose" class="modal-title h5">Verloren</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <button class="btn btn-primary btn-block btn-lg" @click="back" data-dismiss="modal">
                        Zurück zur Levelauswahl
                    </button>
                    <hr class="my-3" />
                    <button v-if="win" class="btn btn-primary btn-block btn-lg" data-toggle="modal" @click="$emit('nextlevel')" aria-label="Close" data-dismiss="modal">
                        Nächstes Level
                    </button>
                    <button v-if="lose" class="btn btn-primary btn-block btn-lg" data-toggle="modal" @click="$emit('restart')" aria-label="Close" data-dismiss="modal">
                        Neustarten
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
            back: function () {
                this.$router.push('/world');
            },
            win: function () {

            },
            lose: function () {

            }
        },
        components: {},
        props: []
    })
</script>
