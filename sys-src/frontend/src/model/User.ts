import Axios from 'axios';
import type Scores from './Scores';
import Score from './Score';

/**
 * @pattern Singleton (GoF:127)
 */
export default class User {
    private static instance: User;
    private username: string | null;
    private email: string | null;
    private levelScores: Scores = {};
    private readonly backendURL = process.env.API_URL;
    private _scoresValid = false;
    private password: string | null;

    private constructor() {
        const nickname = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        if (nickname) {
            this.login(nickname, password);
        }
        this.invalidateScores();
    }

    public static getInstance(): User {
        if (!User.instance) {
            User.instance = new User();
        }
        return User.instance;
    }

    public getUsername(): string {
        return this.username;
    }

    public getPassword(): string {
        return this.password;
    }

    public getEmail(): string {
        return this.email;
    }

    public login(username: string, password: string): void {
        this.username = username;
        this.password = password;
        this.invalidateScores();
    }

    public register(username: string, email: string, password: string): void {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public logout(): void {
        this.username = null;
        localStorage.removeItem('username');
        this.invalidateScores();
    }

    private async getScoresFromServer() {
        return await Axios.get(`${this.backendURL}/game/score/${this.username}`);
    }

    public getScores(cb: (scores: Scores) => void): void {
        if (this._scoresValid) {
            cb(this.levelScores);
            return;
        }
        this.getScoresFromServer()
            .then((response) => {
                this._scoresValid = true;
                this.levelScores = {};
                for (const [key, value] of Object.entries(response.data.scores)) {
                    switch (value) {
                        case 1: {
                            this.levelScores[key] = Score.ONE_STAR;
                            break;
                        }
                        case 2: {
                            this.levelScores[key] = Score.TWO_STARS;
                            break;
                        }
                        case 3: {
                            this.levelScores[key] = Score.THREE_STARS;
                            break;
                        }
                        default: {
                            this.levelScores[key] = Score.LOCKED;
                            break;
                        }
                    }
                }
                cb(this.levelScores);
            })
            .catch((err) => {
                this._scoresValid = true;
                console.error(err);
            });
    }

    private async postScoreToServer(levelID: string, stars: number, money: number, time: number, burnedCells: number) {
        return await Axios.post(`${this.backendURL}/game/score`, {
            username: this.username,
            level: levelID,
            stars: stars,
            money: money,
            burnedFields: burnedCells,
            time: time,
        });
    }

    public postScore(levelID: string, score: Score, money: number, time: number, burnedCells: number): boolean {
        let stars = 0;
        switch (score) {
            case Score.ONE_STAR: {
                stars = 1;
                break;
            }
            case Score.TWO_STARS: {
                stars = 2;
                break;
            }
            case Score.THREE_STARS: {
                stars = 3;
                break;
            }
        }

        // Make sure that the score doesn't get worse
        const old = this.levelScores[levelID];
        if (
            old &&
            (old === Score.THREE_STARS ||
                (old === Score.TWO_STARS && score !== Score.THREE_STARS) ||
                (old === Score.ONE_STAR && score !== Score.TWO_STARS && score !== Score.THREE_STARS))
        ) {
            return false;
        }
        this.levelScores[levelID] = score;
        this.postScoreToServer(levelID, stars, money, time, burnedCells).catch((err) => {
            console.error(err);
            return false;
        });
        return true;
    }

    public isLoggedIn(): boolean {
        return localStorage.getItem('user') != null;
    }

    public invalidateScores(): void {
        this._scoresValid = false;
    }
}
