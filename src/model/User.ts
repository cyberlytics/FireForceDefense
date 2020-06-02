import Axios from 'axios';
import type Scores from './Scores';

/**
 * @pattern Singleton (GoF:127)
 */
export default class User {

    private static instance: User;
    private nickname: string|null;
    private levelScores: Scores = {};
    // TODO: Store this in a configuration file.
    private readonly backendURL = 'https://pmaem20b.uber.space/';

    private constructor() {
        const nickname = localStorage.getItem('nickname');
        if (nickname) {
            this.login(nickname);
        }
    }

    public static getInstance(): User {
        if (!User.instance) {
            User.instance = new User();
        }
        return User.instance;
    }

    public getNickname(): string {
        return this.nickname;
    }

    public login(nickname: string): void {
        this.nickname = nickname;
        localStorage.setItem('nickname', nickname);
    }

    public logout(): void {
        this.nickname = null;
        localStorage.removeItem('nickname');
    }

    private async getScoresFromServer() {
        return await Axios.get(`${this.backendURL}api/${this.nickname}`);
    }

    public getScores(): Scores {
        this.getScoresFromServer()
            .then(response => {
                Object.assign(this.levelScores, response.data.scores);
            })
            .catch(err => console.error(err));
        return this.levelScores;
    }

    private async postScoreToServer(levelID: string, score: number) {
        return await Axios.post(`${this.backendURL}api/${this.nickname}`, { [levelID]: score });
    }

    public postScore(levelID: string, score: number): boolean {
        this.postScoreToServer(levelID, score)
            .catch(err => {
                console.error(err);
                return false;
            });
        return true;
    }

    public isLoggedIn() {
        return this.nickname !== null;
    }
}
