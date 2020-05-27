import FireIntensity from './FireIntensity';

export default class Fire {
    static IntensityToDamage(intensity: FireIntensity): number {
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
}
