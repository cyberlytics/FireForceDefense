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
    const response = await axios.get(API_URL + '/scoreboard');
    return response.data;
}

async function getLevel1Data(): Promise<unknown> {
    const response = await axios.post(API_URL + '/scoreboard', {
        levelId: 1,
    });
    return response.data;
}

async function getLevel2Data(): Promise<unknown> {
    const response = await axios.post(API_URL + '/scoreboard', {
        levelId: 2,
    });
    return response.data;
}

async function getLevel3Data(): Promise<unknown> {
    const response = await axios.post(API_URL + '/scoreboard', {
        levelId: 3,
    });
    return response.data;
}

async function getLevel4Data(): Promise<unknown> {
    const response = await axios.post(API_URL + '/scoreboard', {
        levelId: 4,
    });
    return response.data;
}
