import type Effect from './Effect';
import type HexPosition from './HexPosition';

export default class EffectExecution {
    private static nextId = 0;

    public readonly id: number;
    public readonly effect: Effect;
    public readonly position: HexPosition;

    constructor(effect: Effect, position: HexPosition) {
        this.effect = effect;
        this.position = position;
        this.id = EffectExecution.nextId++;
    }
}
