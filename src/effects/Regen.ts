import Effect from '../model/Effect';
import type LevelMap from '../model/LevelMap';
import type HexPosition from '../model/HexPosition';
import Fire from '../model/Fire';

export default class Regen extends Effect {
    readonly description = 'Regen: Description';
    readonly id = 'Regen';
    readonly name = 'Regen';
    readonly duration: number = 5;

    applyEffect(map: LevelMap, pos: HexPosition): void {
        map.getCellsAround(pos, 4).forEach(cell => {
            cell.fireIntensity = Fire.modify(cell.fireIntensity, -3);
        });
    }

}
