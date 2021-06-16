import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3000';

export const userService = {
    login,
    logout,
};

function isUsernameAnEmail(username: string): boolean {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(username.toLowerCase());
}

async function login(username: string, password: string): Promise<unknown> {
    let email: string;
    let response: AxiosResponse;
    if (isUsernameAnEmail(username)) {
        email = username;
        response = await axios.post(API_URL + '/accounts/login', {
            email,
            password,
        });
    } else {
        response = await axios.post(API_URL + '/accounts/login', {
            username,
            password,
        });
    }

    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

function logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
