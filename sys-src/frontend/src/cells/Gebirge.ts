import Cell from '@model/Cell';

export default class Gebirge extends Cell {
    readonly description =
        'Mountains: An unsteady area with a small amount of vegetation, which gives fire a harder time to expand.';
    readonly name = 'Gebirge';
    readonly id = 'Gebirge';
    readonly groups = ['land'];
    readonly damageMax = Cell.DAMAGE_MAX_HIGH;
    readonly spreadAmount = Cell.SPREAD_AMOUNT_LOW;
    readonly ignitionChance = Cell.IGNITION_CHANCE_LOW;
    readonly ignitionThreshold = Cell.IGNITION_THRESHOLD_HIGH;
    readonly fireGrowChance = 0.1;
    readonly fireGrowAmount = -1;
    readonly maxFireIntensity = Cell.MAX_FIRE_INTENSITY_MEDIUM;
}
