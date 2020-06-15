<template>
    <div id="level-view-sidebar">
        <div class="d-flex flex-row justify-content-between mb-3">
            <div class="bg-light p-2">{{totalMoney}} coins</div>
            <button class="btn btn-light" data-toggle="modal" data-target="#level-menu-modal">Menü</button>
        </div>
        <div class="text-center">
            <h1>FireForceDefense</h1>
        </div>
        <div class="card my-2">
            <div class="card-body">
                <h2 class="card-title h5">Baumenü</h2>
                <div class="build-menu-cards">
                    <div v-for="content in buildableContents" class="build-menu-card" @click.stop="$emit('content-selected', content)">
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
        props: ['buildableContents', 'totalMoney']
    })
</script>
