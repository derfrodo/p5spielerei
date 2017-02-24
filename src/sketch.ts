// tslint:disable-next-line:no-reference
/// <reference path="./../definitions/p5.d.ts" />

import { IGeneralSettings } from "./Models/GeneralSettings";

import doSomething from "./DoSom";

function programm(sketch: any) {

    doSomething();

    // tslint:disable-next-line:variable-name
    let _generalSettings: IGeneralSettings;

    sketch.setup = () => {
        _generalSettings = {
            height: 400,
            width: 400,
        };
        sketch.createCanvas(_generalSettings.width, _generalSettings.height);
        sketch.background(0);
    };
};
const prog = new p5(programm);
