import { userService } from '@services/user.service';
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('user service', () => {
    it('login user with email', async () => {
        const data = {
            data: {
                id: '1',
                username: 'foo',
                email: 'fo0o@fooBar.com',
                token: 'Bearer ey',
            },
        };

        const password = '12345';
        const input = 'fo0o@fooBar.com';

        mockedAxios.post.mockImplementationOnce(() => Promise.resolve(data));
        const expectedData = {
            id: '1',
            username: 'foo',
            email: 'fo0o@fooBar.com',
            token: 'Bearer ey',
        };
        await expect(userService.login(input, password)).resolves.toEqual(expectedData);
    });
    it('register user with email', async () => {
        const data = {
            data: {
                id: '1',
                username: 'foo',
                email: 'fo0o@fooBar.com',
                token: 'Bearer ey',
            },
        };

        const password = '12345';
        const input = 'fo0o@fooBar.com';

        mockedAxios.post.mockImplementationOnce(() => Promise.resolve(data));
        const expectedData = {
            id: '1',
            username: 'foo',
            email: 'fo0o@fooBar.com',
            token: 'Bearer ey',
        };
        await expect(userService.register(data.data.username, input, password)).resolves.toEqual(expectedData);
    });
    it('login user with username', async () => {
        const fetchData = {
            data: {
                id: '1',
                username: 'foobar',
                email: 'fo0o@fooBar.com',
                token: 'Bearer ey',
            },
        };

        const password = '12345';
        const input = 'foobar';

        mockedAxios.post.mockImplementationOnce(() => Promise.resolve(fetchData));
        const expectedData = {
            id: '1',
            username: 'foobar',
            email: 'fo0o@fooBar.com',
            token: 'Bearer ey',
        };
        await expect(userService.login(input, password)).resolves.toEqual(expectedData);
    });

    it('fetches erroneously data from an API', async () => {
        const errorMessage = 'Network Error';
        const password = '12345';
        const input = 'fo0o@fooBar.com';
        mockedAxios.post.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

        await expect(userService.login(input, password)).rejects.toThrow(errorMessage);
    });

    it('remove user from localStorage', () => {
        userService.logout();
        const containsUser: boolean = localStorage.getItem('user') != null;

        expect(containsUser).toBe(false);
    });
});
