/**
 * @pattern Singleton (GoF:127)
 */
export default class User {

    private constructor() {
        // TODO: Try to read nickname from localStorage
    }

    private static instance: User;

    // TODO Store this in a configuration file.
    private readonly backendURL = 'https://pmaem20b.uber.space/';

    public nickname: string|null;

    public static getInstance(): User {
        if (!User.instance) {
            User.instance = new User();
        }
        return User.instance;
    }

    public login(nickname: string) {
        this.nickname = nickname;
    }

    public logout() {
        this.nickname = null;
    }

    public getScore() {
        // TODO: HTTP GET request to backend; return results as score
    }

    public postScore(key: string, value: number) {
        // TODO: HTTP POST request to backend with scores (key and value parameters) as request body
    }
}
