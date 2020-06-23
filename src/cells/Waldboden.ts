import Cell from '../model/Cell';

export default class Waldboden extends Cell {
    readonly description = 'Forest ground: The fertilized earth with good vegetation gives fire more time to stay.';
    readonly name = 'Waldboden';
    readonly id = 'Waldboden';
    readonly groups = ['land'];
    readonly damageMax = Cell.DAMAGE_MAX_HIGH;
    readonly spreadAmount = Cell.SPREAD_AMOUNT_MEDIUM;
    readonly ignitionChance = Cell.IGNITION_CHANCE_HIGH;
    readonly ignitionThreshold = Cell.IGNITION_THRESHOLD_LOW;
    readonly fireGrowChance = 0.6;
    readonly fireGrowAmount = 2;
    readonly maxFireIntensity = Cell.MAX_FIRE_INTENSITY_HIGH;
}
