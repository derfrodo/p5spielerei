/// <reference path="./../../definitions/definitions.d.ts" />

import { IGeneralSettings } from "./../Models/IGeneralSettings";
import { ITetrisGridCell, ITetrisGameData } from "./../Models/IGame";
import TetrisGameHelper from "./TetrisGameHelper";

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

        const alphaEmpty = 0.1;
        const hue = 60;
        const sat = 100;
        const brightness = 50;
        const alpha = 0.05;

        const grid = this._game.grid;

        this._sketch.colorMode(this._sketch.HSB);

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
                    this._sketch.fill(hue, sat, brightness, alpha);
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