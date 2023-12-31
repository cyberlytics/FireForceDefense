import Cell from '@model/Cell';

export default class Vulkangestein extends Cell {
    readonly description =
        'Volcanics: The harsh terrain keeps the existing vegetation dry and improves the expansion of fire.';
    readonly name = 'Vulkangestein';
    readonly id = 'Vulkangestein';
    readonly groups = ['land'];
    readonly damageMax = Cell.DAMAGE_MAX_HIGH;
    readonly spreadAmount = Cell.SPREAD_AMOUNT_LOW;
    readonly ignitionChance = Cell.IGNITION_CHANCE_LOW;
    readonly ignitionThreshold = Cell.IGNITION_THRESHOLD_HIGH;
    readonly fireGrowChance = 0.05;
    readonly fireGrowAmount = -1;
    readonly maxFireIntensity = Cell.MAX_FIRE_INTENSITY_HIGH;
}
