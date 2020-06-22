import Cell from '../model/Cell';

export default class Lavasee extends Cell {
    readonly description = 'Lavasee: An everlasting heat source, which burns everything around it with ease.';
    readonly name = 'Lavasee';
    readonly id = 'Lavasee';
    readonly groups = ['lava'];
    readonly damageMax = +Infinity;
    readonly spreadAmount = Cell.SPREAD_AMOUNT_HIGH;
    readonly ignitionChance = Cell.IGNITION_CHANCE_HIGH;
    readonly ignitionThreshold = Cell.IGNITION_THRESHOLD_LOW;
    readonly fireGrowChance = 1;
    readonly fireGrowAmount = 7;
    readonly maxFireIntensity = Cell.MAX_FIRE_INTENSITY_HIGH;
}
