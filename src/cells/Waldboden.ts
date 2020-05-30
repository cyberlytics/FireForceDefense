import Cell from '../model/Cell';

export default class Waldboden extends Cell {
    readonly description = 'Waldboden: Description';
    readonly name = 'Waldboden';
    readonly id = 'Waldboden';
    readonly groups = ['land'];
    readonly damageMax = Cell.DAMAGE_MAX_HIGH;
    readonly spreadAmount = Cell.SPREAD_AMOUNT_MEDIUM;
    readonly ignitionChance = Cell.IGNITION_CHANCE_HIGH;
    readonly ignitionThreshold = Cell.IGNITION_THRESHOLD_LOW;
    readonly fireGrowAmount = 2;
    readonly maxFireIntensity = Cell.MAX_FIRE_INTENSITY_HIGH;
}
