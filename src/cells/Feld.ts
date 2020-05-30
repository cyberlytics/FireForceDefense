import Cell from '../model/Cell';

export default class Feld extends Cell {
    readonly description = 'Feld: Description';
    readonly name = 'Feld';
    readonly id = 'Feld';
    readonly groups = ['land'];
    readonly damageMax = Cell.DAMAGE_MAX_LOW;
    readonly spreadAmount = Cell.SPREAD_AMOUNT_HIGH;
    readonly ignitionChance = Cell.IGNITION_CHANCE_HIGH;
    readonly ignitionThreshold = Cell.IGNITION_THRESHOLD_LOW;
    readonly fireGrowAmount = 3;
    readonly maxFireIntensity = Cell.MAX_FIRE_INTENSITY_HIGH;
}
