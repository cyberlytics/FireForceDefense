import Cell from '../model/Cell';

export default class Abgebrannt extends Cell {
    readonly description = 'Abgebrannt: A burnt area without life or the extinguished fire.';
    readonly name = 'Abgebrannt';
    readonly id = 'Abgebrannt';
    readonly groups = ['land'];
    readonly damageMax = +Infinity;
    readonly spreadAmount = Cell.SPREAD_AMOUNT_MEDIUM;
    readonly ignitionChance = 0;
    readonly ignitionThreshold = +Infinity;
    readonly fireGrowChance = 0.5;
    readonly fireGrowAmount = -1;
    readonly maxFireIntensity = Cell.MAX_FIRE_INTENSITY_HIGH;
}
