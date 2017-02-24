import { ITetrisGameData } from "./IGame";

const Shapes = {
    shapeI: "I",
    shapeL: "L",
    shapeT: "T",
    // const shapeL = "L";
    // static shapeT = "T";
    // static shapeI = "I";
    // static shapeZ = "Z";
    // static shapeS = "S";
};

const Orientations = {
    North: 0,
    East: 1,
    South: 2,
    West: 3,
};

interface ITetrisElement {
    row: number;
    col: number;
    orientation: number;
    shape: string;
}



interface ITetrisElementCell {
    row: number;
    col: number;
};



/** Funktionen zur Verarbeitung / Analyse von Tetris Elementen */
class TetrisElementManager {

    public elementCanIncrementRow(element: ITetrisElement, game: ITetrisGameData): boolean {
        let nextElement = Object.assign({}, element, { row: element.row + 1 });
        const nextCells: ITetrisElementCell[] = this.calculateNeededCells(nextElement);
        return this.gridCellsAreAvailable(nextCells, game);
    }

    public gridCellsAreAvailable(cells: ITetrisElementCell[], game: ITetrisGameData): boolean {
        return false;
    }

    /** Liefert true, sofern das übergebene Element die vom Element augenblicklich belegten Zellen blockieren darf */
    public elementCanBlockCells(element: ITetrisElement): boolean {
        const nextCells: ITetrisElementCell[] = this.calculateNeededCells(element);
        return true;
    }

    // public updateElement() {
    //     var nextCells = this.getNeededCells(this.row + 1, this.col, this.orientation);
    //     if (this.checkCells(nextCells)) {
    //         this.cells = nextCells;
    //         this.row++;
    //     }
    //     else {
    //         if (this.blockCells()) {
    //             activeElement = null;
    //             this._done = true;
    //         }
    //         else {
    //             clearInterval(fallingAnimationHandle);
    //             textSize(32);
    //             gameOver = true;
    //             text("Game Over", 40, 40)

    //         }
    //     }
    // }

    public calculateNeededCells(element: ITetrisElement): ITetrisElementCell[] {

        return null;
    }

}


/*
const Shapes = {
    shapeI: "I",
    shapeL: "L",
    shapeT: "T",
    // const shapeL = "L";
    // static shapeT = "T";
    // static shapeI = "I";
    // static shapeZ = "Z";
    // static shapeS = "S";
};

const Orientations = {
    North: 0,
    East: 1,
    South: 2,
    West: 3
}

class PuzzleElement {

    constructor(col, row, shape) {
        this.col = col;
        this.row = row;

        this.orientation = Orientations.North;
        this.shape = shape;


        let cells = [];
        let outOfBoundsCells = [];
        do {
            cells = this.getNeededCells(this.row, this.col, this.orientation);
            outOfBoundsCells = cells.filter(c => c.col < 0 || c.col > cols);
            for (let c of outOfBoundsCells) {
                if (c.col < 0) {
                    this.col++;
                }
                else {
                    this.col--;
                }
            }
        } while (outOfBoundsCells.length > 0)

        do {
            cells = this.getNeededCells(this.row, this.col, this.orientation);
            outOfBoundsCells = cells.filter(c => c.row > row);
            if (outOfBoundsCells.length > 0) {
                this.row--;
            }
        } while (outOfBoundsCells.length > 0)

        this.cells = cells;
    }

    draw() {

        fill((hue + 180) % 360, sat, brightness, 1);

        for (let i = 0; i < this.cells.length; i++) {
            // let eleX = offsetX + activeElement.col * cellSize + cellSize / 2;
            // let eleY = offsetY + activeElement.row * cellSize + cellSize / 2;

            let cell = this.cells[i];
            if (cell.row >= 0) {
                let eleX = offsetX + cell.col * cellSize + cellSize / 2;
                let eleY = offsetY + cell.row * cellSize + cellSize / 2;

                ellipse(eleX,
                    eleY,
                    cellSize);
            }
        }

    }

    isDone() {
        return this._done;
    }

    goLeft() {
        if (this.col > 0) {
            var nextCells = this.getNeededCells(this.row, this.col - 1, this.orientation);
            this.col--;
        }
    }

    goRight() {
        if (this.col + 1 < cols) {
            var nextCells = this.getNeededCells(this.row, this.col + 1, this.orientation);
            this.col++;
        }
    }

    addCol(amount) {
        let nextCol = this.col + amount;
        if (nextCol >= 0 && nextCol < cols) {
            var nextCells = this.getNeededCells(this.row, nextCol, this.orientation);
            if (this.checkCells(nextCells)) {
                this.cells = nextCells;
                this.col = nextCol;
            }
        }
    }

    move(code) {

        switch (code) {
            case LEFT_ARROW:
                this.addCol(-1);
                break;
            case RIGHT_ARROW:
                this.addCol(1);
                break;
            case UP_ARROW:
                this.turnClockwise();
                break;
        }
    }

    turnClockwise() {
        let nextOrientation = (this.orientation + 1) % 4;

        let nextCells = this.getNeededCells(this.row, this.col, nextOrientation);
        if (this.checkCells(nextCells)) {
            this.cells = nextCells;
            this.orientation = nextOrientation;
        }

        // switch (this.orientation) {
        //     case Orientations.North:
        //         this.orientation = Orientations.East;
        //         break;
        //     case Orientations.East:
        //         this.orientation = Orientations.South;
        //         break;
        //     case Orientations.South:
        //         this.orientation = Orientations.West;
        //         break;
        //     case Orientations.West:
        //         this.orientation = Orientations.North;
        //         break;
        // }
    }

    update() {
        var nextCells = this.getNeededCells(this.row + 1, this.col, this.orientation);
        if (this.checkCells(nextCells)) {
            this.cells = nextCells;
            this.row++;
        }
        else {
            if (this.blockCells()) {
                activeElement = null;
                this._done = true;
            }
            else{
                clearInterval(fallingAnimationHandle);
                textSize(32);
                gameOver=true;
                text("Game Over", 40,40)

            }
        }
    }

    blockCells() {
        for (let c of this.cells) {
            if (c.row >= 0) {
                let gc = getGridCell(grid, c.col, c.row);
                gc.blocked = true;
            }
            else{
                return false;
            }
        }
        return true;
    }

    checkCells(cells) {
        for (let c of cells) {
            if (c.row >= rows) {
                return false;
            }
            if (c.col < 0 || c.col >= cols) {
                return false;
            }

            if (c.row >= 0) {
                let gc = getGridCell(grid, c.col, c.row);
                if (gc.blocked) {
                    return false;
                }
            }
        }
        return true;
    }

    getNeededCells(row, col, orientation) {
        switch (this.shape) {
            case Shapes.shapeI:
                return this.getShapeICells(row, col, orientation);
                break;
        }
    }

    getShapeICells(row, col, orientation) {
        let cells = [];

        var posVector = createVector(0, 0);
        var bottomVector = createVector(0, -1);
        var firstUpVector = createVector(0, 1);
        var secondUpVector = createVector(0, 2);

        var deltaVectors = [];
        deltaVectors.push(posVector);
        deltaVectors.push(bottomVector);
        deltaVectors.push(firstUpVector);
        deltaVectors.push(secondUpVector);

        this.rotateDeltaVectors(deltaVectors, orientation);

        for (let i = 0; i < deltaVectors.length; i++) {
            var v = deltaVectors[i];
            var cx = col - Math.round(v.x);
            var cy = row - Math.round(v.y);
            var cll = new Cell(cy, cx);
            // console.log(cll)
            cells.push(cll);
        }

        return cells;
    }

    rotateDeltaVectors(deltaVectors, orientation) {

        var angle = orientation * HALF_PI;
        // switch (orientation) {
        //     case Orientations.North:
        //         break;
        //     case Orientations.East:
        //         angle = HALF_PI;
        //         break;
        //     case Orientations.South:
        //         angle = PI;
        //         break;

        //     case Orientations.West:
        //         angle = PI + HALF_PI;
        //         break;
        // }

        if (angle) {
            for (let v of deltaVectors) {
                // console.log(v);
                v.rotate(angle);
                // console.log(v);
            }
        }
    }
}

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

*/