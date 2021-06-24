<template>
    <div class="scoreboard-div">
        <div class="scoreboard-button-div">
            <button class="btn btn-primary" @click="goToMap">Zum Menü</button>
        </div>
        <div class="scoreboard-button-table-div">
            <table class="scoreboard-button-table">
                <tr>
                    <td class="scoreboard-button-td">
                        <b-button
                            :variant="levelFilter === null || levelFilter === undefined ? 'primary' : 'outline-primary'"
                            class="scoreboard-table-td-button"
                            @click="filter()"
                        >
                            Alle
                        </b-button>
                    </td>
                    <td v-for="lvl in ['1', '2', '3', '4']" :key="lvl" class="scoreboard-button-td">
                        <b-button
                            :variant="levelFilter === `lvl${lvl.padStart(3, '0')}` ? 'primary' : 'outline-primary'"
                            class="scoreboard-table-td-button"
                            @click="filter(`lvl${lvl.padStart(3, '0')}`)"
                        >
                            Level {{lvl}}
                        </b-button>
                    </td>
                </tr>
            </table>
        </div>
        <div class="scoreboard-data-table-div">
            <table class="scoreboard-data-table">
                <thead class="scoreboard-data-thead">
                    <tr class="scoreboard-data-tr-header">
                        <th class="scoreboard-data-th">Rang</th>
                        <th class="scoreboard-data-th">Name</th>
                        <th class="scoreboard-data-th">Sterne</th>
                        <th class="scoreboard-data-th">Zeit</th>
                        <th class="scoreboard-data-th">Gold</th>
                        <th class="scoreboard-data-th">Flächen</th>
                    </tr>
                </thead>
                <tbody class="scoreboard-data-tbody">
                    <template v-for="(user, index) in items">
                        <tr v-if="getUserTR(user.username)" :key="index" class="scoreboard-data-tr">
                            <td class="scoreboard-data-td">{{ index + 1 }}</td>
                            <td class="scoreboard-data-td">{{ user.username }}</td>
                            <td class="scoreboard-data-td">{{ user.stars }}</td>
                            <td class="scoreboard-data-td">{{ user.time }}</td>
                            <td class="scoreboard-data-td">{{ user.money }}</td>
                            <td class="scoreboard-data-td">{{ user.burnedFields }}</td>
                        </tr>
                        <tr v-else :key="index" class="scoreboard-data-tr-user">
                            <td class="scoreboard-data-td">{{ index + 1 }}</td>
                            <td class="scoreboard-data-td">{{ user.username }}</td>
                            <td class="scoreboard-data-td">{{ user.stars }}</td>
                            <td class="scoreboard-data-td">{{ user.time }}</td>
                            <td class="scoreboard-data-td">{{ user.money }}</td>
                            <td class="scoreboard-data-td">{{ user.burnedFields }}</td>
                        </tr>
                    </template>
                </tbody>
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
            levelFilter: null,
            username: localStorage.getItem('username'),
        };
    },
    mounted() {
        this.filter();
    },
    methods: {
        filter(level: string = undefined) {
            this.levelFilter = level;
            scoreboardService.getData(level).then((response) => {
                this.items = response;
            })
        },
        goToMap() {
            this.$router.push('/world');
        },
        getUserTR(name: string): boolean {
            if (name == this.username) {
                return false;
            } else {
                return true;
            }
        },
    },
});
</script>

<style scoped></style>
