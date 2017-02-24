// tslint:disable-next-line:no-reference
/// <reference path="./../definitions/p5.d.ts" />

import { IGeneralSettings } from "./Models/IGeneralSettings";
import { ITetrisGridCell, ITetrisGameData } from "./Models/IGame";
import GameHelper from "./Helpers/TetrisGameHelper";

function tetris(sketch: any) {

    // tslint:disable-next-line:variable-name
    let _generalSettings: IGeneralSettings;

    let _game: ITetrisGameData;

    sketch.setup = () => {
        _generalSettings = {
            height: 400,
            width: 400,
            offsetX: 40,
            offsetY: 40,
        };

        createGame(_generalSettings);

        sketch.createCanvas(_generalSettings.width, _generalSettings.height);
        sketch.background(0);

        sketch.noFill();
        sketch.noStroke();
        sketch.fill(255, 0, 255);

        sketch.textSize(32);
        sketch.text("Hallo Zusammen", 40, 40);
    };


    const createGame = (generalSettings: IGeneralSettings) => {
        let cellSize = GameHelper.calculateGridCellSize(10, generalSettings);
        let cells = [];

        for (let i: number = 0; i < _game.grid.rows; i++) {
            for (let j: number = 0; j < _game.grid.cols; j++) {
                const cell: ITetrisGridCell = {
                    row: i,
                    col: j,
                };
                cells.push(cell);
            }
        }

        _game = {
            grid: {
                cells,
                cols: 10,
                rows: 10,
                cellSize,
            },
            player: {
                id: "",
                name: "",
            },
        };
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