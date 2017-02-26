import { ITetrisGameData, ITetrisGrid, ITetrisGridCell } from "./../Models/IGame";
import { IGeneralSettings } from "./../Models/IGeneralSettings";

export class TetrisGameHelper {

    public static getGridCell(row: number, col: number, grid: ITetrisGrid): ITetrisGridCell {
        if (col < 0 || col >= grid.cols) {
            throw `Failed to get grid at col ${col}. Index out of range. Max cols: ${grid.cols}`;
        }

        if (row < 0 || row >= grid.rows) {
            throw `Failed to get grid at row ${row}. Index out of range. Max rows: ${grid.rows}`;
        }

        return grid.cells[row * grid.cols + col];
    }

    public static GetGridCellPosition(cell: ITetrisGridCell, game: ITetrisGameData, generalSettings: IGeneralSettings) {

    }

    public static calculateGridCellSize(rows: number, generalSettings: IGeneralSettings): number {
        let gridHeight: number = generalSettings.height - (2 * generalSettings.offsetY);
        return Math.floor(gridHeight / rows);
    }

}

export default TetrisGameHelper;