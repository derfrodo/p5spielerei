import { ITetrisGameData, ITetrisGrid, ITetrisGridCell } from "./../Models/IGame";
import { IGeneralSettings } from "./../Models/IGeneralSettings";

export class TetrisGameHelper {

    /** Singleton instanz */
    public static Instance: TetrisGameHelper;

    private _generalSettings: IGeneralSettings;
    private _game: ITetrisGameData;

    constructor(game: ITetrisGameData, generalSettings: IGeneralSettings) {
        this._game = game;
        this._generalSettings = generalSettings;
        
        this.startGame = this.startGame.bind(this);
        this.calculateBackgroundData = this.calculateBackgroundData.bind(this);
        this.getGridCell = this.getGridCell.bind(this);
    }

    public startGame() {
        this._game.calculateBackgroundHandle =
            setInterval(this.calculateBackgroundData,
                this._game.backgroundUpdateInterval);
    }

    public calculateBackgroundData(): void {
        const grid = this._game.grid;
        for (let i = grid.cols - 1; i >= 0; i--) {
            for (let j = grid.rows - 1; j >= 0; j--) {
                let cell = this.getGridCell(j, i);// grid[i + j * cols];

                if (j == 0) {
                    cell.background = Math.floor(Math.random() * 2) === 1;
                } else {
                    const upperCell = this.getGridCell(j - 1, i);
                    cell.background = upperCell.background;
                }

            }
        }
    }

    public getGridCell(row: number, col: number): ITetrisGridCell {
        const grid = this._game.grid;
        if (col < 0 || col >= grid.cols) {
            throw `Failed to get grid at col ${col}. Index out of range. Max cols: ${grid.cols}`;
        }

        if (row < 0 || row >= grid.rows) {
            throw `Failed to get grid at row ${row}. Index out of range. Max rows: ${grid.rows}`;
        }

        return grid.cells[row * grid.cols + col];
    }

    public static calculateGridCellSize(rows: number, generalSettings: IGeneralSettings): number {
        let gridHeight: number = generalSettings.height - (2 * generalSettings.offsetY);
        return Math.floor(gridHeight / rows);
    }

}

export default TetrisGameHelper;