import type Effect from './Effect';
import type LevelMap from './LevelMap';
import type HexPosition from './HexPosition';
import EffectExecution from './EffectExecution';

export default class EffectManager {
    public currentEffects: EffectExecution[] = [];

    public applyEffect(effect: Effect, map: LevelMap, position: HexPosition) {
        const effectExecution = new EffectExecution(effect, position);
        this.currentEffects.push(effectExecution);

        effect.applyEffect(map, position);

        setTimeout(() => {
            this.currentEffects = this.currentEffects.filter((e) => e !== effectExecution);
        }, effect.duration * 1000);
    }
}
