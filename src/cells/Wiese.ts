import Cell from '../model/Cell';

export default class Wiese extends Cell {
    readonly damageMax = Cell.DAMAGE_MAX_MEDIUM;
    readonly description = 'Wiese: Description';
    readonly fireGrowAmount = 2;
    readonly groups = ['land'];
    readonly id = 'Wiese';
    readonly ignitionChance = Cell.IGNITION_CHANCE_MEDIUM;
    readonly ignitionThreshold = Cell.IGNITION_THRESHOLD_MEDIUM;
    readonly maxFireIntensity = Cell.MAX_FIRE_INTENSITY_MEDIUM;
    readonly name = 'Wiese';
    readonly spreadAmount = Cell.SPREAD_AMOUNT_MEDIUM;
}
