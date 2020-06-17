import type LevelMap from './LevelMap';
import type HexPosition from './HexPosition';
import type Explainable from './Explainable';

export default abstract class Effect implements Explainable {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly duration: number;
    abstract readonly range: number;

    abstract applyEffect(map: LevelMap, pos: HexPosition): void;
}
