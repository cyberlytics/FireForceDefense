import Cell from '../model/Cell';

export default class Lavasee extends Cell {
    readonly description = 'Lavasee: Description';
    readonly name = 'Lavasee';
    readonly id = 'Lavasee';
    readonly groups = ['lava'];
    readonly damageMax = +Infinity;
    readonly spreadAmount = Cell.SPREAD_AMOUNT_HIGH;
    readonly ignitionChance = Cell.IGNITION_CHANCE_HIGH;
    readonly ignitionThreshold = Cell.IGNITION_THRESHOLD_LOW;
    readonly fireGrowAmount = 10;
    readonly maxFireIntensity = Cell.MAX_FIRE_INTENSITY_HIGH;
}
