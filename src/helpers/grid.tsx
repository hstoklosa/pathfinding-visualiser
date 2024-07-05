import { GridType, TileType } from "../utils/types";
import {
    START_TILE_CONFIG,
    END_TILE_CONFIG,
    MAX_COLS,
    MAX_ROWS,
    TILE_STYLE,
} from "../utils/constants";

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

export const isEqual = (a: TileType, b: TileType): boolean => {
    return a.row === b.row && a.col === b.col;
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

export const resetGrid = ({
    grid,
    startTile = START_TILE_CONFIG,
    endTile = END_TILE_CONFIG,
}: {
    grid: GridType;
    startTile?: TileType;
    endTile: TileType;
}) => {
    for (let row = 0; row < MAX_ROWS; row++) {
        for (let col = 0; col < MAX_COLS; col++) {
            const tile = grid[row][col];

            // reset Tile values
            tile.distance = Infinity;
            tile.isTraversed = false;
            tile.isPath = false;
            tile.parent = null;
            tile.isWall = false;

            if (!isEqual(startTile, tile) && !isEqual(endTile, tile)) {
                const tileElement = document.getElementById(
                    `${tile.row}-${tile.col}`
                );

                if (tileElement) {
                    tileElement.className = TILE_STYLE;
                }

                if (tile.row === MAX_ROWS - 1) {
                    tileElement?.classList.add("border-b");
                }

                if (tile.col === 0) {
                    tileElement?.classList.add("border-l");
                }
            }
        }
    }
};
