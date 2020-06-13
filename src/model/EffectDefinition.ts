import type HexPosition from './HexPosition';
import type EffectDerivedType from './EffectDerivedType';

export default interface EffectDefinition {
    effectType: EffectDerivedType;
    pos: HexPosition;
    mustBeExecuted: (gameStep: number) => boolean;
}
