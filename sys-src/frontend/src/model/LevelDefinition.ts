import type CellDefinition from './CellDefinition';
import type ContentDefinition from './ContentDefinition';
import type EffectDefinition from './EffectDefinition';

export default interface LevelDefinition {
    levelID: string;
    cellDefinitions: CellDefinition[];
    contentDefinitions: ContentDefinition[];
    effectDefinitions: EffectDefinition[];
    creditStartingAmount: number;
    // TODO Maybe make gain and reward configurable per level.
}
