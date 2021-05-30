import Cell from '../model/Cell';

export default class Wueste extends Cell {
    readonly description =
        "Desert: An area with few and far between vegetation causes trouble for a fire, but can't stop its rampage";
    readonly name = 'Wueste';
    readonly id = 'Wueste';
    readonly groups = ['land'];
    readonly damageMax = Cell.DAMAGE_MAX_HIGH;
    readonly spreadAmount = Cell.SPREAD_AMOUNT_LOW;
    readonly ignitionChance = Cell.IGNITION_CHANCE_LOW;
    readonly ignitionThreshold = Cell.IGNITION_THRESHOLD_HIGH;
    readonly fireGrowChance = 0.1;
    readonly fireGrowAmount = -1;
    readonly maxFireIntensity = Cell.MAX_FIRE_INTENSITY_LOW;
}
