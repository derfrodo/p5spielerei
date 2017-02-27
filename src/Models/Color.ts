/** Eine Farbe mit Umrechnungen in den HSB Raum: https://de.wikipedia.org/wiki/HSV-Farbraum#Umrechnung_RGB_in_HSV.2FHSL */

export class Color {

    public _red: number = 0;
    public _green: number = 0;
    public _blue: number = 0;

    private _hue: number;
    private _sat: number;
    private _brightness: number;

    constructor() { }

    /** Aktualisiert die RGB Values -> Zünden nach aktualisierung der HSB Values */
    private refreshRGBValues() {
        const nextColor = this.calculateRgbFactors(this._hue, this._sat, this._brightness);
        this._red = Math.round(nextColor.r * 255);
        this._green = Math.round(nextColor.g * 255);
        this._blue = Math.round(nextColor.b * 255);
    }

    /** Aktualisiert die HSB Values -> Zünden nach neuen Werten für RGB Raum. */
    private refreshHSBValues() {
        const hsv = this.calculateHSBValues(this._red, this._green, this._blue);
        this._hue = hsv.h;
        this._brightness = hsv.bFacctor * 100;
        this._sat = hsv.sFactor * 100;
    }

    private calculateHSBValues(red: number, green: number, blue: number):
        { h: number, sFactor: number, bFacctor: number } {

        const r = this.getColorFactor(this._red);
        const g = this.getColorFactor(this._green);
        const b = this.getColorFactor(this._blue);

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;

        const result = {
            h: 0,
            sFactor: 0,
            bFacctor: 0,
        }

        if (max === min) {
            // mach nichts -> hue bleibt stets 0
        } else if (r === max) {
            let factor = (g - b) / delta;
            result.h = 60 * factor;
        } else if (g === max) {
            let factor = (b - r) / delta;
            result.h = 60 * (2 + factor);
        } else if (b === max) {
            let factor = (r - g) / delta;
            result.h = 60 * (4 + factor);
        }

        while (result.h < 0) {
            result.h += 360;
        }

        result.sFactor = max === 0 ?
            0 :
            (delta / max);

        result.bFacctor = Math.max(r, g, b);

        return result;
    }

    get red(): number {
        return this._red;
    }

    set red(nextRed: number) {
        this._red = nextRed;
        this.refreshHSBValues();
    }

    get green(): number {
        return this._green;
    }

    set green(nextGreen: number) {
        this._green = nextGreen;
        this.refreshHSBValues();
    }

    get blue(): number {
        return this._blue;
    }

    set blue(nextBlue: number) {
        this._blue = nextBlue;
        this.refreshHSBValues();
    }

    get hue(): number {
        return this._hue;
    }

    set hue(nextHue: number) {
        this._hue = nextHue;
        this.refreshRGBValues();
    }

    get sat(): number {
        return this._sat;
    }

    set sat(nextSat: number) {
        this._sat = nextSat;
        this.refreshRGBValues();
    }

    get brightness(): number {
        return this._brightness;
    }

    set brightness(nextBrightness: number) {
        this._brightness = nextBrightness;
        this.refreshRGBValues();
    }

    /** Umrechnung von HSB zu RGB nach https://de.wikipedia.org/wiki/HSV-Farbraum */
    private calculateRgbFactors(nextHue: number, nextSat: number, nextBrightness: number):
        { r: number, g: number, b: number } {
        const h = nextHue;
        const s = nextSat / 100;
        const v = nextBrightness / 100;

        const hi = Math.floor(h / 60);
        const f = (h / 60) - hi;

        const p = v * (1 - s);
        const q = v * (1 - s * f);
        const t = v * (1 - s * (1 - f));

        const result = {
            r: 0, g: 0, b: 0,
        };

        switch (hi) {
            case 0:
            case 6:
                result.r = v;
                result.g = t;
                result.b = p;
                break;
            case 1:
                result.r = q;
                result.g = v;
                result.b = p;
                break;
            case 2:
                result.r = p;
                result.g = v;
                result.b = t;
                break;
            case 3:
                result.r = p;
                result.g = q;
                result.b = v;
                break;
            case 4:
                result.r = t;
                result.g = p;
                result.b = v;
                break;
            case 5:
                result.r = v;
                result.g = p;
                result.b = q;
                break;
            default:
                throw "failed to convert color from hsv to rgb";
        }
        // console.log(result);

        return result;
    }

    /** Berechne aus einem RGB Farbwert (0-255) einen Faktor (0...1) */
    private getColorFactor(rgbColorValue: number) {
        return rgbColorValue / 255;
    }
}