<template>
    <div id="level-view-sidebar">
        <div class="d-flex flex-row justify-content-between mb-3">
            <div class="bg-light p-2">1234 Coins</div>
            <button class="btn btn-light" data-toggle="modal" data-target="#level-menu-modal">Menü</button>
        </div>
        <div class="text-center">
            <h1>FireForceDefense</h1>
            <svg width="100px" height="100px" class="mt-2 mb-4">
                <circle r="50%" cx="50%" cy="50%" stroke="#000" fill="transparent" />
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Logo</text>
            </svg>
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

    export default Vue.extend({
        data() {
            return {}
        },
        methods: {},
        components: {},
        props: []
    })
</script>
