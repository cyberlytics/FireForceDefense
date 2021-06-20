import Axios from 'axios';
import type Scores from './Scores';
import Score from './Score';

/**
 * @pattern Singleton (GoF:127)
 */
export default class User {
    private static instance: User;
    private nickname: string | null;
    private levelScores: Scores = {};
    // TODO: Store this in a configuration file.
    //private readonly backendURL = 'https://pmaem20b.uber.space/';
    //Todo replace by final mongoDB url
    private readonly backendURL = 'http://localhost:3000/';
    private _scoresValid = false;
    private password: string | null;

    private constructor() {
        const nickname = localStorage.getItem('nickname');
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

    public getNickname(): string {
        return this.nickname;
    }
    public getPassword(): string {
        return this.password;
    }

    public login(nickname: string, password: string): void {
        this.nickname = nickname;
        this.password = password;
        this.invalidateScores();
    }

    public logout(): void {
        this.nickname = null;
        localStorage.removeItem('nickname');
        this.invalidateScores();
    }

    private async getScoresFromServer() {
        return await Axios.get(`${this.backendURL}game/${this.nickname}`);
    }

    public getScores(cb: (scores: Scores) => void): void {
        if (this._scoresValid) {
            cb(this.levelScores);
            return;
        }
        this.getScoresFromServer()
            .then((response) => {
                const data = response.data;
                this._scoresValid = true;
                this.levelScores = {};
                for (let i = 0; i < data.length; i++) {
                    const level = data[i].level;
                    const stars = data[i].stars;

                    switch (stars) {
                        case 1: {
                            this.levelScores[level] = Score.ONE_STAR;
                            break;
                        }
                        case 2: {
                            this.levelScores[level] = Score.TWO_STARS;
                            break;
                        }
                        case 3: {
                            this.levelScores[level] = Score.THREE_STARS;
                            break;
                        }
                        default: {
                            this.levelScores[level] = Score.LOCKED;
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
        return await Axios.post(`${this.backendURL}game/save`, {
            username: this.nickname,
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
