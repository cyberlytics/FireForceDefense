import Axios from 'axios';
import type Scores from './Scores';
import Score from './Score';

/**
 * @pattern Singleton (GoF:127)
 */
export default class User {

    private static instance: User;
    private nickname: string|null;
    private levelScores: Scores = {};
    // TODO: Store this in a configuration file.
    private readonly backendURL = 'https://pmaem20b.uber.space/';
    private _scoresValid = false;

    private constructor() {
        const nickname = localStorage.getItem('nickname');
        if (nickname) {
            this.login(nickname);
        }
        this.invalidateScores();
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
        this.invalidateScores();
    }

    public logout(): void {
        this.nickname = null;
        localStorage.removeItem('nickname');
        this.invalidateScores();
    }

    private async getScoresFromServer() {
        return await Axios.get(`${this.backendURL}api/${this.nickname}`);
    }

    public getScores(cb: (scores: Scores) => void): void {
        if (this._scoresValid) {
            cb(this.levelScores);
            return;
        }
        this.getScoresFromServer()
            .then(response => {
                this._scoresValid = true;
                this.levelScores = {};
                for (const [key, value] of Object.entries(response.data.scores)) {
                    switch (value) {
                        case 1: { this.levelScores[key] = Score.ONE_STAR; break; }
                        case 2: { this.levelScores[key] = Score.TWO_STARS; break; }
                        case 3: { this.levelScores[key] = Score.THREE_STARS; break; }
                        default: {
                            this.levelScores[key] = Score.LOCKED;
                            break;
                        }
                    }
                }
                cb(this.levelScores);
            })
            .catch(err => {
                this._scoresValid = true;
                console.error(err);
            });
    }

    private async postScoreToServer(levelID: string, stars: number) {
        return await Axios.post(`${this.backendURL}api/${this.nickname}`, { [levelID]: stars });
    }

    public postScore(levelID: string, score: Score): boolean {
        this.invalidateScores();
        let stars = 0;
        switch (score) {
            case Score.ONE_STAR: { stars = 1; break; }
            case Score.TWO_STARS: { stars = 2; break; }
            case Score.THREE_STARS: { stars = 3; break; }
        }
        this.postScoreToServer(levelID, stars)
            .catch(err => {
                console.error(err);
                return false;
            });
        return true;
    }

    public isLoggedIn() {
        return this.nickname !== null;
    }

    public invalidateScores() {
        this._scoresValid = false;
    }
}
