import Effect from '../model/Effect';
import type LevelMap from '../model/LevelMap';
import type HexPosition from '../model/HexPosition';

export default class Feuer1 extends Effect {
    readonly description = 'Feuer 1: Description';
    readonly id = 'Feuer1';
    readonly name = 'Feuer 1';
    readonly duration = 0;

    applyEffect(map: LevelMap, pos: HexPosition): void {
    }

}
