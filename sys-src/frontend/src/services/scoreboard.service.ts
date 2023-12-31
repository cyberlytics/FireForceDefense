import axios from 'axios';

const API_URL = process.env.API_URL;

export const scoreboardService = {
    getData,
};

async function getData(level: string): Promise<unknown> {
    const config =
        level === null || level === undefined
            ? {}
            : {
                  params: {
                      level,
                  },
              };
    const response = await axios.get(API_URL + '/game/scoreboard', config);
    return response.data;
}
