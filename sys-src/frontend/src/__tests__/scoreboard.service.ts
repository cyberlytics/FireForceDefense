import { scoreboardService } from '@services/scoreboard.service';
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('scoreboard service', () => {
    it('get data from level', async () => {
        const data = {
            data: {
                id: '1',
                username: 'Thomas',
                level: 'lvl001',
                stars: 3,
                money: 4000,
                burnedFields: 4,
                time: 2,
            },
        };

        mockedAxios.get.mockImplementationOnce(() => Promise.resolve(data));

        await expect(scoreboardService.getData('lvl001')).resolves.toBeTruthy();
    });
});
