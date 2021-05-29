/**
 * The directions are measured in arc degrees.
 * They start on the positive side of the horizontal axis and are measured anti-clockwise.
 *   120 060
 * 180  o   000
 *   240 300
 */
enum HexDirection {
    DIRECTION_0,
    DIRECTION_60,
    DIRECTION_120,
    DIRECTION_180,
    DIRECTION_240,
    DIRECTION_300,
}

export default HexDirection;
