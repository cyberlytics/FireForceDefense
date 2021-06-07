import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

export const userService = {
    login,
    logout,
};

async function login(username: string, password: string): Promise<unknown> {
    const response = await axios.post(API_URL + 'signin', {
        username,
        password,
    });
    if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

function logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


