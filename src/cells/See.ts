import Cell from '../model/Cell';

export default class See extends Cell {
    readonly description = 'Lake: An infinite water supply leads to a very high water resistance.';
    readonly name = 'See';
    readonly id = 'See';
    readonly groups = ['water'];
    readonly damageMax = +Infinity;
    readonly spreadAmount = 0;
    readonly ignitionChance = 0;
    readonly ignitionThreshold = +Infinity;
    readonly fireGrowChance = 1;
    readonly fireGrowAmount = -Infinity;
    readonly maxFireIntensity = 0;
}
