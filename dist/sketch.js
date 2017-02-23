function programm(sketch) {
    var _generalSettings;
    sketch.setup = function () {
        _generalSettings = {
            height: 400,
            width: 400
        };
        sketch.createCanvas(_generalSettings.width, _generalSettings.height);
        sketch.background(0);
    };
}
;
var prog = new p5(programm);
//# sourceMappingURL=sketch.js.map