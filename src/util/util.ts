export class Util {
    static colorLuminance(color, lum) {
        lum = lum || 0
        let rgb = '',
        c,
        i
        for (i = 0; i < 3; i++) {
            c = color[i]
            c = Math.round(Math.min(Math.max(0, c + c * lum), 255))
            rgb += c+','
        }

        return rgb.slice(0, -1);
    }
}