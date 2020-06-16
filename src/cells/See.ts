import Cell from '../model/Cell';

export default class See extends Cell {
    readonly description = 'See: Description';
    readonly name = 'See';
    readonly id = 'See';
    readonly groups = ['water'];
    readonly damageMax = +Infinity;
    readonly spreadAmount = 0;
    readonly ignitionChance = 0;
    readonly ignitionThreshold = +Infinity;
    readonly fireGrowAmount = -Infinity;
    readonly maxFireIntensity = 0;
}
