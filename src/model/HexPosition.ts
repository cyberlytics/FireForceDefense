/**
 * This class stores hexagonal positions.
 * It uses axial coordinates (q and r) internally, but also exposes the calculated cube coordinates (x, y, z).
 * @see https://www.redblobgames.com/grids/hexagons/
 */
import HexDirection from './HexDirection';
import type AxialCoordinates from './AxialCoordinates';
import type CubeCoordinates from './CubeCoordinates';

export default class HexPosition implements AxialCoordinates, CubeCoordinates {

    public get x() {
        return this.q;
    }
    public get y() {
        return -this.q - this.r;
    }
    public get z() {
        return this.r;
    }

    /**
     * Constructor for hexagonal positions specified by axial coordinates.
     * @param q The (skewed) column index.
     * @param r The row index.
     */
    public constructor(q: number, r: number) {
        this.q = q;
        this.r = r;
    }

    private static readonly directionVectors = {
        [HexDirection.DIRECTION_0]: new HexPosition(+1, 0),
        [HexDirection.DIRECTION_60]: new HexPosition(+1, -1),
        [HexDirection.DIRECTION_120]: new HexPosition(0, -1),
        [HexDirection.DIRECTION_180]: new HexPosition(-1, 0),
        [HexDirection.DIRECTION_240]: new HexPosition(-1, +1),
        [HexDirection.DIRECTION_300]: new HexPosition(0, +1),
    };
    public readonly q: number;
    public readonly r: number;

    public static fromAxial({q, r}: AxialCoordinates) {
        return new HexPosition(q, r);
    }
    public static fromCube({x, y, z}: CubeCoordinates) {
        if (x + y + z !== 0) {
            console.warn('Invalid coordinates supplied! Ignoring y component.');
        }
        return new HexPosition(x, z);
    }

    public static add(p1: HexPosition, p2: HexPosition) {
        return new HexPosition(p1.q + p2.q, p1.r + p2.r);
    }

    public static getDirectionVector(direction: HexDirection) {
        return HexPosition.directionVectors[direction];
    }

    public getNeighborPosition(direction: HexDirection) {
        return HexPosition.add(this, HexPosition.getDirectionVector(direction));
    }

    public toString() {
        return '(' + this.q + ',' + this.r + ')';
    }
}
