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
