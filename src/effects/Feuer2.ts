import Effect from '../model/Effect';
import type LevelMap from '../model/LevelMap';
import type HexPosition from '../model/HexPosition';
import FireIntensity from "../model/FireIntensity";
import Fire from "../model/Fire";

export default class Feuer2 extends Effect {
    readonly description = 'Feuer 2: Description';
    readonly id = 'Feuer2';
    readonly name = 'Feuer2';
    readonly duration: number = 0;

    applyEffect(map: LevelMap, pos: HexPosition): void {
        const cell = map.getCellAt(pos);
        cell.fireIntensity = Fire.modify(cell.fireIntensity, 9);
    }

}
