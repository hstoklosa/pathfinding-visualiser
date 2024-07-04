import { GridType, TileType } from "../utils/types";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";

const createRow = (
    row: number,
    startTile: TileType,
    endTile: TileType
): TileType[] => {
    const currRow: TileType[] = [];

    for (let col = 0; col < MAX_COLS; col++) {
        currRow.push({
            row,
            col,
            isStart: row === startTile.row && col === startTile.col,
            isEnd: row === endTile.row && col === endTile.col,
            isWall: false,
            isPath: false,
            isTraversed: false,
            distance: Infinity,
            parent: null,
        });
    }

    return currRow;
};

export const createGrid = (startTile: TileType, endTile: TileType): GridType => {
    const grid: GridType = [];

    for (let row = 0; row < MAX_ROWS; row++) {
        grid.push(createRow(row, startTile, endTile));
    }

    return grid;
};

export const checkIfStartOrEnd = (row: number, col: number): boolean => {
    return (
        (row === 1 && col === 1) || (row === MAX_ROWS - 2 && col === MAX_COLS - 2)
    );
};

export const createNewGrid = (
    grid: GridType,
    row: number,
    col: number
): TileType[][] => {
    const newGrid = grid.slice();
    const newTile = {
        ...newGrid[row][col],
        isWall: !newGrid[row][col].isWall,
    };

    newGrid[row][col] = newTile;
    return newGrid;
};
