import { isEqual } from "../../../helpers/grid";
import { getUntraversedNeighbours } from "../../../utils/getUntraversedNeighbours";
import { removeFromQueue } from "../../../utils/removeFromQueue";
import { retrievePath } from "../../../utils/retrievePath";
import { GridType, TileType } from "../../../utils/types";

export const dijkstra = (grid: GridType, startTile: TileType, endTile: TileType) => {
    const base = grid[startTile.row][startTile.col]; 
    base.distance = 0;
    base.isTraversed = true;

    const traversedTiles: TileType[] = [];
    const untraversedTiles = [base];

    while (untraversedTiles.length > 0) {
        untraversedTiles.sort((i, j) => i.distance - j.distance);

        const currentTile = untraversedTiles.shift();
        if (currentTile) {
            if (currentTile.isWall) continue;
            if (currentTile.distance === Infinity) break;

            currentTile.isTraversed = true;
            traversedTiles.push(currentTile);

            if (isEqual(currentTile, endTile)) break;

            const neighbours = getUntraversedNeighbours(grid, currentTile);
            for (let i = 0; i < neighbours.length; i++) {
                if (currentTile.distance + 1 < neighbours[i].distance) {
                    removeFromQueue(neighbours[i], untraversedTiles);

                    neighbours[i].distance = currentTile.distance + 1;
                    neighbours[i].parent = currentTile;

                    untraversedTiles.push(neighbours[i]);
                }
            }
        }
    }

    const path = retrievePath(grid, endTile);

    return { traversedTiles, path };
};
