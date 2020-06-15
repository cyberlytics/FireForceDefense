import Effect from '../model/Effect';
import type LevelMap from '../model/LevelMap';
import type HexPosition from '../model/HexPosition';
import Fire from '../model/Fire';

export default class Lava extends Effect {
    readonly description = 'Lava: Description';
    readonly id = 'Lava';
    readonly name = 'Lava';
    readonly duration: number = 5;

    applyEffect(map: LevelMap, pos: HexPosition): void {
        map.getCellsAround(pos, 3).forEach(cell => {
            cell.fireIntensity = Fire.modify(cell.fireIntensity, 12);
        });
    }

}
