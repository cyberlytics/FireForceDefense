<template>
    <div id="level-view-sidebar">
        <div class="d-flex flex-row justify-content-between mb-3">
            <div class="bg-light p-2">1234 Coins</div>
            <button class="btn btn-light" data-toggle="modal" data-target="#level-menu-modal">Menü</button>
        </div>
        <div class="text-center">
            <logo />
        </div>
        <div class="card my-2">
            <div class="card-body">
                <h2 class="card-title h5">Baumenü</h2>
            </div>
        </div>
        <div class="card my-2">
            <div class="card-body">
                <h2 class="card-title h5">Hilfe</h2>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import logo from './logo.vue';

    export default Vue.extend({
        data() {
            return {}
        },
        methods: {},
        components: {
            logo,
        },
        props: []
    })
</script>
