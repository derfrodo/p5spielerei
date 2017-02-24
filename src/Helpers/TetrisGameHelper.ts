import { ITetrisGameData, ITetrisGrid, ITetrisGridCell } from "./../Models/IGame";
import { IGeneralSettings } from "./../Models/IGeneralSettings";

export class TetrisGameHelper {

    public static getGridCell(row: number, col: number, game: ITetrisGameData): ITetrisGridCell {
        if (col < 0 || col >= game.grid.cols) {
            throw `Failed to get grid at col ${col}. Index out of range. Max cols: ${game.grid.cols}`;
        }

        if (row < 0 || row >= game.grid.rows) {
            throw `Failed to get grid at row ${row}. Index out of range. Max rows: ${game.grid.rows}`;
        }

        return game.grid.cells[row * game.grid.cols + col];
    }

    public static GetGridCellPosition(cell: ITetrisGridCell, game: ITetrisGameData, generalSettings: IGeneralSettings) {

    }

    public static calculateGridCellSize(rows:number, generalSettings: IGeneralSettings): number {
        let gridHeight: number = generalSettings.height - (2 * generalSettings.offsetY);
        return Math.floor(gridHeight / rows);
    }
}

export default TetrisGameHelper;