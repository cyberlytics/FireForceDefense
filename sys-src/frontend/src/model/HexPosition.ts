/**
 * This class stores hexagonal positions.
 * It uses axial coordinates (q and r) internally, but also exposes the calculated cube coordinates (x, y, z).
 * @see https://www.redblobgames.com/grids/hexagons/
 */
import HexDirection from './HexDirection';
import type AxialCoordinates from './AxialCoordinates';
import type CubeCoordinates from './CubeCoordinates';

export default class HexPosition implements AxialCoordinates, CubeCoordinates {
    public get x(): number {
        return this.q;
    }
    public get y(): number {
        return -this.q - this.r;
    }
    public get z(): number {
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

    public static fromAxial({ q, r }: AxialCoordinates): HexPosition {
        return new HexPosition(q, r);
    }
    public static fromCube({ x, y, z }: CubeCoordinates): HexPosition {
        if (x + y + z !== 0) {
            console.warn('Invalid coordinates supplied! Ignoring y component.');
        }
        return new HexPosition(x, z);
    }

    public static add(p1: HexPosition, p2: HexPosition): HexPosition {
        return new HexPosition(p1.q + p2.q, p1.r + p2.r);
    }

    public static getDirectionVector(direction: HexDirection): HexPosition {
        return HexPosition.directionVectors[direction];
    }

    public static getDistance(p1: HexPosition, p2: HexPosition): number {
        return Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y), Math.abs(p1.z - p2.z));
    }

    public static getWidth(): number {
        return Math.sqrt(3);
    }

    public static getIncircleRadiusHorizontalComponent(hexRadius = 0, size = 1): number {
        return (0.5 + 0.75 * hexRadius - (hexRadius % 2) * 0.25) * this.getWidth() * size;
    }

    public static getIncircleRadiusVerticalComponent(hexRadius = 0, size = 1): number {
        const tmp = Math.floor((hexRadius - 1) / 2) * 0.75 + 0.5;
        return (tmp + Math.abs(tmp)) * size;
    }

    public static getIncircleRadius(hexRadius = 0, size = 1): number {
        return Math.sqrt(
            Math.pow(this.getIncircleRadiusHorizontalComponent(hexRadius, size), 2) +
                Math.pow(this.getIncircleRadiusVerticalComponent(hexRadius, size), 2),
        );
    }

    public getCenterX(size = 1): number {
        return size * (1.732050808 * this.q + 0.8660254038 * this.r);
    }

    public getCenterY(size = 1): number {
        return size * 1.5 * this.r;
    }

    public getNeighborPosition(direction: HexDirection): HexPosition {
        return HexPosition.add(this, HexPosition.getDirectionVector(direction));
    }

    public toString(): string {
        return '(' + this.q + ',' + this.r + ')';
    }

    public getPathString(size = 1): string {
        const s = parseFloat(size.toString());
        const xOff = s * 0.8660254038;
        const halfSize = s * 0.5;
        return (
            +xOff +
            ',' +
            -halfSize +
            ' ' +
            +xOff +
            ',' +
            +halfSize +
            ' ' +
            0 +
            ',' +
            +s +
            ' ' +
            -xOff +
            ',' +
            +halfSize +
            ' ' +
            -xOff +
            ',' +
            -halfSize +
            ' ' +
            0 +
            ',' +
            -s
        );
    }
}
