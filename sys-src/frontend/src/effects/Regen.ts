import Effect from '@model/Effect';
import type LevelMap from '@model/LevelMap';
import type HexPosition from '@model/HexPosition';
import Fire from '@model/Fire';

export default class Regen extends Effect {
    readonly description = 'Regen: Description';
    readonly id = 'Regen';
    readonly name = 'Regen';
    readonly duration = 1;
    readonly range = 4;

    applyEffect(map: LevelMap, pos: HexPosition): void {
        map.getCellsAround(pos, this.range).forEach((cell) => {
            cell.fireIntensity = Fire.modify(cell.fireIntensity, -3);
        });
    }
}
