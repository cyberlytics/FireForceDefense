import Effect from '../model/Effect';
import type LevelMap from '../model/LevelMap';
import type HexPosition from '../model/HexPosition';
import Fire from "../model/Fire";

export default class Feuer1 extends Effect {
    readonly description = 'Feuer 1: Description';
    readonly id = 'Feuer1';
    readonly name = 'Feuer1';
    readonly duration: number = 0;

    applyEffect(map: LevelMap, pos: HexPosition): void {
        const cell = map.getCellAt(pos);
        cell.fireIntensity = Fire.modify(cell.fireIntensity, 5);

    }

}
