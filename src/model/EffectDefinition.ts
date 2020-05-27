import type HexPosition from './HexPosition';
import type Effect from './Effect';

export default interface EffectDefinition {
    effectType: typeof Effect;
    pos: HexPosition;
    after: number;
}
