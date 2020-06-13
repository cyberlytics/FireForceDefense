import Effect from '../model/Effect';
import type LevelMap from "../model/LevelMap";
import type HexPosition from "../model/HexPosition";
import Fire from "../model/Fire";

export default class Feuerball extends Effect {
    readonly description = 'Feuerball: Description';
    readonly id = 'Feuerball';
    readonly name = 'Feuerball';
    readonly duration: number = 3;

    applyEffect(map: LevelMap, pos: HexPosition): void {
        map.getCellsAround(pos, 2).forEach(cell => {
            cell.fireIntensity = Fire.modify(cell.fireIntensity, 9);
        })
    }
}

