import type Effect from './Effect';

// See https://stackoverflow.com/a/52358194
type EffectClass = typeof Effect;
export default interface EffectDerivedType extends EffectClass {}
