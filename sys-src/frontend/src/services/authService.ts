import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

class AuthService {
    login(username: string, password: string) {
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

    logout() {
        localStorage.removeItem("user");
    }
}

export default new AuthService();
