import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

export const userService = {
    login,
    logout,
};

function login(username: string, password: string) {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
}

/*
function handleResponse(response: any) {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
*/
