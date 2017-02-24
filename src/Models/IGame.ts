export interface IGameData {
    player: IPlayer;
}

export interface ITetrisGameData extends IGameData {

    /** Anzahl der Zeilen für ein Tetris Spiel */
    rows: number;

    /** Anzahl der Spalten für ein Tetris Spiel */
    cols: number;
}

/** interface für einen Spieler -> Mittelfristig vielleicht sowas wie nen Login möglich? */
interface IPlayer {
    id: string;
    name: string;
}
