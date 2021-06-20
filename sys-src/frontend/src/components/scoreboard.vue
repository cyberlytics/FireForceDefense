<template>
    <div class="scoreboard-div">
        <div class="scoreboard-button-div">
            <button class="btn btn-primary" @click="goToMap">Zum Menü</button>
        </div>
        <div class="scoreboard-table-div">
            <table class="scoreboard-table">
                <tr>
                    <td class="scoreboard-button-td">
                        <b-button variant="outline-danger" class="scoreboard-table-td-button" @click="buttonAll">
                            Alle
                        </b-button>
                    </td>
                    <td class="scoreboard-button-td">
                        <b-button variant="outline-danger" class="scoreboard-table-td-button" @click="buttonLevel1"
                            >Level 1</b-button
                        >
                    </td>
                    <td class="scoreboard-button-td">
                        <b-button variant="outline-danger" class="scoreboard-table-td-button" @click="buttonLevel2"
                            >Level 2</b-button
                        >
                    </td>
                    <td class="scoreboard-button-td">
                        <b-button variant="outline-danger" class="scoreboard-table-td-button" @click="buttonLevel3"
                            >Level 3</b-button
                        >
                    </td>
                    <td class="scoreboard-button-td">
                        <b-button variant="outline-danger" class="scoreboard-table-td-button" @click="buttonLevel4"
                            >Level 4</b-button
                        >
                    </td>
                </tr>
            </table>
            <table class="scoreboard-table">
                <tr>
                    <th>Rang</th>
                    <th>Name</th>
                    <th>Sterne</th>
                    <th>Zeit</th>
                    <th>Gold</th>
                    <th>Flächen</th>
                </tr>
                <tr v-for="(user, index) in items" :key="index" class="scoreboard-body-tr">
                    <td class="scoreboard-body-td">{{ index + 1 }}</td>
                    <td class="scoreboard-body-td">{{ user.Name }}</td>
                    <td class="scoreboard-body-td">{{ user.Sterne }}</td>
                    <td class="scoreboard-body-td">{{ user.Zeit }}</td>
                    <td class="scoreboard-body-td">{{ user.Gold }}</td>
                    <td class="scoreboard-body-td">{{ user.Flaechen }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { scoreboardService } from '@services/scoreboard.service';

export default Vue.extend({
    data() {
        return {
            items: null,
        };
    },
    mounted() {
        scoreboardService.getLevelAllData().then((response) => (this.items = response));
    },
    methods: {
        buttonAll() {
            scoreboardService.getLevelAllData().then((response) => {
                this.items = response;
            });
        },
        buttonLevel1() {
            scoreboardService.getLevel1Data().then((response) => {
                this.items = response;
            });
        },
        buttonLevel2() {
            scoreboardService.getLevel2Data().then((response) => {
                this.items = response;
            });
        },
        buttonLevel3() {
            scoreboardService.getLevel3Data().then((response) => {
                this.items = response;
            });
        },
        buttonLevel4() {
            scoreboardService.getLevel4Data().then((response) => {
                this.items = response;
            });
        },
        goToMap() {
            this.$router.push('/world');
        },
    },
});
</script>

<style scoped></style>
