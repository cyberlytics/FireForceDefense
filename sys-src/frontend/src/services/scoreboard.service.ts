import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const scoreboardService = {
    getLevelAllData,
    getLevel1Data,
    getLevel2Data,
    getLevel3Data,
    getLevel4Data,
};

async function getLevelAllData(): Promise<unknown> {
    const response = await axios.get(API_URL + '/game/scoreboard');
    return response.data;
}

async function getLevel1Data(): Promise<unknown> {
    const response = await axios.get(API_URL + '/game/scoreboard', {
        params: {
            level: 'lvl001',
        },
    });
    return response.data;
}

async function getLevel2Data(): Promise<unknown> {
    const response = await axios.get(API_URL + '/game/scoreboard', {
        params: {
            level: 'lvl002',
        },
    });
    return response.data;
}

async function getLevel3Data(): Promise<unknown> {
    const response = await axios.get(API_URL + '/game/scoreboard', {
        params: {
            level: 'lvl003',
        },
    });
    return response.data;
}

async function getLevel4Data(): Promise<unknown> {
    const response = await axios.get(API_URL + '/game/scoreboard', {
        params: {
            level: 'lvl004',
        },
    });
    return response.data;
}
