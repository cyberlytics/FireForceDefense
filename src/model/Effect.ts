import type LevelMap from './LevelMap';
import type HexPosition from './HexPosition';

export default abstract class Effect {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly duration: number;

    abstract applyEffect(map: LevelMap, pos: HexPosition): void;
}
