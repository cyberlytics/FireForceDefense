import type Score from './Score';

export default interface Scores {
    [levelID: string]: Score;
}
