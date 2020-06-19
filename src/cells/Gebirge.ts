import Cell from '../model/Cell';

export default class Gebirge extends Cell {
    readonly description = 'Gebirge: Description';
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
