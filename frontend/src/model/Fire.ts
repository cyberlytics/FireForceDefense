import FireIntensity from './FireIntensity';

export default class Fire {
    static intensityToFireCategory(intensity: FireIntensity): number {
        switch (intensity) {
            case FireIntensity.INTENSITY_0:
                return 0;
            case FireIntensity.INTENSITY_1:
            case FireIntensity.INTENSITY_2:
            case FireIntensity.INTENSITY_3:
                return 1;
            case FireIntensity.INTENSITY_4:
            case FireIntensity.INTENSITY_5:
            case FireIntensity.INTENSITY_6:
                return 2;
            case FireIntensity.INTENSITY_7:
            case FireIntensity.INTENSITY_8:
            case FireIntensity.INTENSITY_9:
                return 3;
            case FireIntensity.INTENSITY_10:
            case FireIntensity.INTENSITY_11:
            case FireIntensity.INTENSITY_12:
                return 4;
            default:
                return 0;
        }
    }

    static intensityToDamage(intensity: FireIntensity): number {
        return this.intensityToFireCategory(intensity);
    }

    private static intensityToInt(intensity: FireIntensity): number {
        switch (intensity) {
            case FireIntensity.INTENSITY_0: return 0;
            case FireIntensity.INTENSITY_1: return 1;
            case FireIntensity.INTENSITY_2: return 2;
            case FireIntensity.INTENSITY_3: return 3;
            case FireIntensity.INTENSITY_4: return 4;
            case FireIntensity.INTENSITY_5: return 5;
            case FireIntensity.INTENSITY_6: return 6;
            case FireIntensity.INTENSITY_7: return 7;
            case FireIntensity.INTENSITY_8: return 8;
            case FireIntensity.INTENSITY_9: return 9;
            case FireIntensity.INTENSITY_10: return 10;
            case FireIntensity.INTENSITY_11: return 11;
            case FireIntensity.INTENSITY_12: return 12;
        }
    }

    private static intToIntensity(int: number): FireIntensity {
        switch (int) {
            case 0: return FireIntensity.INTENSITY_0;
            case 1: return FireIntensity.INTENSITY_1;
            case 2: return FireIntensity.INTENSITY_2;
            case 3: return FireIntensity.INTENSITY_3;
            case 4: return FireIntensity.INTENSITY_4;
            case 5: return FireIntensity.INTENSITY_5;
            case 6: return FireIntensity.INTENSITY_6;
            case 7: return FireIntensity.INTENSITY_7;
            case 8: return FireIntensity.INTENSITY_8;
            case 9: return FireIntensity.INTENSITY_9;
            case 10: return FireIntensity.INTENSITY_10;
            case 11: return FireIntensity.INTENSITY_11;
            case 12: return FireIntensity.INTENSITY_12;
            default: return FireIntensity.INTENSITY_0;
        }
    }

    static modify(
        intensity: FireIntensity,
        amount: number,
        maxIntensity: FireIntensity = FireIntensity.INTENSITY_12,
        natural: boolean = false
    ): FireIntensity {
        if (amount > 0) {
            if (natural && intensity === FireIntensity.INTENSITY_0) {
                return FireIntensity.INTENSITY_0;
            }
            return this.intToIntensity(Math.min(
                this.intensityToInt(maxIntensity),
                this.intensityToInt(intensity) + Math.floor(amount)
            ));
        } else if (amount < 0) {
            return this.intToIntensity(
                Math.max(
                    this.intensityToInt(FireIntensity.INTENSITY_0),
                    Math.min(
                        this.intensityToInt(maxIntensity),
                        this.intensityToInt(intensity) - Math.floor(Math.abs(amount))
                    )
                )
            );
        }
        return intensity;
    }
}
