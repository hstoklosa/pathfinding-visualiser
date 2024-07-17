import { GridType, TileType } from "./types";

export const retrievePath = (grid: GridType, endTile: TileType) => {
    const path: TileType[] = [];
    let currTile = grid[endTile.row][endTile.col];

    while (currTile !== null) {
        currTile.isPath = true;
        path.unshift(currTile);
        currTile = currTile.parent!;
    }

    return path;
};
