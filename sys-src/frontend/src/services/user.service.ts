import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const userService = {
    login,
    logout,
};

async function login(username: string, password: string): Promise<unknown> {
    // TODO Ausgabe entfernen
    console.log('Login Frontend Funktion');
    const response = await axios.post(API_URL + '/accounts/login', {
        username,
        password,
    });
    if (response.data.token) {
        // TODO Ausgabe entfernen
        console.log('Accesstoken recieved');
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

function logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
