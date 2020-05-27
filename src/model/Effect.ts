export default abstract class Effect {
    abstract readonly id: string;
    abstract readonly name: string;
    abstract readonly description: string;

    abstract applyEffect(): void;
}
