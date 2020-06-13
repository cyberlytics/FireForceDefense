import Effect from '../model/Effect';
import type LevelMap from "../model/LevelMap";
import type HexPosition from "../model/HexPosition";
import Fire from "../model/Fire";

export default class Gewitter extends Effect {
    readonly description = 'Gewitter: Description';
    readonly id = 'Gewitter';
    readonly name = 'Gewitter';
    readonly duration: number = 5;

    applyEffect(map: LevelMap, pos: HexPosition): void {
        const cell = map.getCellAt(pos);
        cell.fireIntensity = Fire.modify(cell.fireIntensity, 12);
    }

}
