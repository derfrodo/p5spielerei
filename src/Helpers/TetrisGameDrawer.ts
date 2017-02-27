/// <reference path="./../../definitions/definitions.d.ts" />

import { IGeneralSettings } from "./../Models/IGeneralSettings";
import { ITetrisGridCell, ITetrisGameData } from "./../Models/IGame";
import TetrisGameHelper from "./TetrisGameHelper";
import { Color } from "./../Models/Color";

export class TetrisGameDrawer {

    /** Singleton instanz */
    public static Instance: TetrisGameDrawer;


    private _sketch: Sketch;
    private _generalSettings: IGeneralSettings;
    private _game: ITetrisGameData;
    constructor(sketch: Sketch, game: ITetrisGameData, generalSettings: IGeneralSettings) {
        this._sketch = sketch;
        this._game = game;
        this._generalSettings = generalSettings;

        this.drawGrid = this.drawGrid.bind(this);
    }

    public drawGrid(): void {
        const offsetX: number = this._generalSettings.offsetX;
        const offsetY: number = this._generalSettings.offsetY;
        const cellSize: number = this._game.grid.cellSize;

        const color = new Color();

        color.hue = 60;
        color.sat = 100;
        color.brightness = 100;

        const alphaEmpty = 25;
        // const hue = 60;
        // const sat = 100;
        // const brightness = 100;
        const alpha = 20;

        const grid = this._game.grid;

        //this._sketch.colorMode(this._sketch.HSB);
        this._sketch.colorMode(this._sketch.RGB);

        this._sketch.noStroke();
        this._sketch.stroke(0);
        this._sketch.strokeWeight(3);
        for (let i: number = 0; i < grid.cols; i++) {
            for (let j = 0; j < grid.rows; j++) {
                const cell = TetrisGameHelper.Instance.getGridCell(j, i);

                if (cell.blocked) {
                    this._sketch.fill(10, 0, 50, alphaEmpty);
                }
                else if (cell.background) {
                    this._sketch.fill(color._red, color._green, color._blue,alpha );
                    
                    //  console.log(color);
                    // this._sketch.fill(color.hue,color.sat,color.brightness, alpha);
                }
                else {
                    // this._sketch.stroke(255, alphaEmpty);
                    this._sketch.fill(255, alphaEmpty);
                }

                let cellX = offsetX + i * cellSize + cellSize / 2;
                let cellY = offsetY + j * cellSize + cellSize / 2;

                //point(cellX, cellY);

                this._sketch.ellipse(cellX,
                    cellY,
                    cellSize);
            }
        }
    }

}

export default TetrisGameDrawer;