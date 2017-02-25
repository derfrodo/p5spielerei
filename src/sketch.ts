// tslint:disable-next-line:no-reference
/// <reference path="./../definitions/p5.d.ts" />

import { IGeneralSettings } from "./Models/IGeneralSettings";
import { ITetrisGridCell, ITetrisGameData } from "./Models/IGame";
import GameHelper from "./Helpers/TetrisGameHelper";

function tetris(sketch: any) {

    let _generalSettings: IGeneralSettings;
    let _game: ITetrisGameData;

    sketch.setup = () => {
        _generalSettings = {
            height: 400,
            width: 400,
            offsetX: 40,
            offsetY: 40,
        };

        _game = createGame(_generalSettings);

        sketch.createCanvas(_generalSettings.width, _generalSettings.height);
        sketch.background(0);

        // sketch.stroke(255);
        // sketch.line(10, 40, 30, 40);

        sketch.noFill();
        sketch.noStroke();
        sketch.fill(255, 0, 255);

const textSize = 12;

        sketch.textSize(textSize );
        sketch.text("Hallo Zusammen", _generalSettings.offsetX, textSize );
    };


    const createGame = (generalSettings: IGeneralSettings): ITetrisGameData => {
        let cellSize = GameHelper.calculateGridCellSize(10, generalSettings);
        let cells = [];

        const rows = 10;
        const cols = 10;

        for (let i: number = 0; i < rows; i++) {
            for (let j: number = 0; j < cols; j++) {
                const cell: ITetrisGridCell = {
                    row: i,
                    col: j,
                };
                cells.push(cell);
            }
        }
        const game = {
            grid: {
                cells,
                cols,
                rows,
                cellSize,
            },
            player: {
                id: "",
                name: "",
            },
        };
        return game;
    };
};

const prog = new p5(tetris);


/*
sketch.js 
function setup() {
    createCanvas(400, 400);
    textSize(32);

    for (let i = 1; i <= numbers; i++) {
        let r = startNumber / i;
        console.log(r);
    }
    // noLoop();
}

const noRest = function (num, numbers) {
    for (let i = 1; i <= numbers; i++) {
        let r = num / i;
        if (Math.floor(r) < r) {
            console.log(r);
            return false;
        }
    }
    return true;
}

var startNumber = 420;
var numbers = 14;

function draw() {
    let exit = 0;
    do {
        if (noRest(startNumber, numbers)) {
            console.log(startNumber);
    text(`Zahl ${startNumber}`, 40, 40)
        noLoop();
            break;
        }
        else {

            startNumber +=7;
            exit++;
            if (exit >= 5) {
                background(255)
    text(`Zahl ${startNumber}`, 40, 40)
                break;
            }

            console.log(startNumber);
        }
    } while (true)
}
*/