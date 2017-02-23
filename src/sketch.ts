// tslint:disable-next-line:no-reference
/// <reference path="./../definitions/p5.d.ts" />

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
    };
};

interface IGeneralSettings {
    width: number;
    height: number;
}


var prog = new p5(programm);