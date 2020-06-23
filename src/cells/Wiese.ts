import Cell from '../model/Cell';

export default class Wiese extends Cell {
    readonly description = 'Meadow: Grassy landscape is important for the livestock. Unfortunately its easily devoured by fire.';
    readonly name = 'Wiese';
    readonly id = 'Wiese';
    readonly groups = ['land'];
    readonly damageMax = Cell.DAMAGE_MAX_MEDIUM;
    readonly spreadAmount = Cell.SPREAD_AMOUNT_MEDIUM;
    readonly ignitionChance = Cell.IGNITION_CHANCE_MEDIUM;
    readonly ignitionThreshold = Cell.IGNITION_THRESHOLD_MEDIUM;
    readonly fireGrowChance = 0.4;
    readonly fireGrowAmount = 2;
    readonly maxFireIntensity = Cell.MAX_FIRE_INTENSITY_MEDIUM;
}
