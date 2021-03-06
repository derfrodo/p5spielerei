import { IGeneralSettings } from "./IGeneralSettings";


export interface ITetrisGameData {
    player: IPlayer;
    grid: ITetrisGrid;


    backgroundUpdateInterval : number ;
    calculateBackgroundHandle:number;
}

export interface ITetrisGrid {
    cells: ITetrisGridCell[];

    /** Die Größe der zu zeichnenden Zelle in Pixel */
    cellSize: number;

    /** Anzahl der Zeilen für ein Tetris Spiel */
    rows: number;

    /** Anzahl der Spalten für ein Tetris Spiel */
    cols: number;


}

export interface ITetrisGridCell {
    row: number;
    col: number;
    
    blocked?:boolean;
    background?:boolean;
}

/** interface für einen Spieler -> Mittelfristig vielleicht sowas wie nen Login möglich? */
interface IPlayer {
    id: string;
    name: string;
}
