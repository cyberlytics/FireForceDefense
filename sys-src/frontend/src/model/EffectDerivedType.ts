import type Effect from './Effect';

// See https://stackoverflow.com/a/52358194
type EffectClass = typeof Effect;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface EffectDerivedType extends EffectClass {}
