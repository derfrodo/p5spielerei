// tslint:disable-next-line:no-reference
/// <reference path="./../definitions/p5.d.ts" />

import { IGeneralSettings } from "./Models/IGeneralSettings";

function programm(sketch: any) {

    // tslint:disable-next-line:variable-name
    let _generalSettings: IGeneralSettings;

    sketch.setup = () => {
        _generalSettings = {
            height: 400,
            width: 400,
        };
        sketch.createCanvas(_generalSettings.width, _generalSettings.height);
        sketch.background(0);

        sketch.noFill();
        sketch.noStroke();
        sketch.fill(255, 0, 255);

        sketch.textSize(32);
        sketch.text("Hallo Zusammen", 40, 40);
    };
};
const prog = new p5(programm);
