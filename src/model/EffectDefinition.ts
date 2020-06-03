import type HexPosition from './HexPosition';
import type Effect from './Effect';

// See https://stackoverflow.com/a/52358194
type EffectClass = typeof Effect;
interface EffectDerived extends EffectClass {}

export default interface EffectDefinition {
    effectType: EffectDerived;
    pos: HexPosition;
    after: number;
}
