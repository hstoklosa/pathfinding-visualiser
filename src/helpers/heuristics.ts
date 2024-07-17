import { GridType, TileType } from "../utils/types";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";

export const initHeuristicCost = (grid: GridType, endTile: TileType) => {
    const totalHeuristicCost: number[][] = [];

    for (let i = 0; i < MAX_ROWS; i++) {
        const row: number[] = [];

        for (let j = 0; j < MAX_COLS; j++) {
            const rowDiff = Math.abs(grid[i][j].row - endTile.row);
            const colDiff = Math.abs(grid[i][j].col - endTile.col);
            const cost = 1 * (rowDiff + colDiff);

            row.push(cost);
        }

        totalHeuristicCost.push(row);
    }

    return totalHeuristicCost;
};

export const initFunctionCost = () => {
    const cost: number[][] = [];

    for (let i = 0; i < MAX_ROWS; i++) {
        const row: number[] = [];

        for (let j = 0; j < MAX_COLS; j++) {
            row.push(Infinity);
        }

        cost.push(row);
    }

    return cost;
};
