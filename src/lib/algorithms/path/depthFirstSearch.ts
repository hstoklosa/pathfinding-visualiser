import { GridType, TileType } from "../../../utils/types";
import { getUntraversedNeighbours } from "../../../utils/getUntraversedNeighbours";
import { checkStack, isEqual } from "../../../helpers/grid";
import { retrievePath } from "../../../utils/retrievePath";

export const depthFirstSearch = (
    grid: GridType,
    startTile: TileType,
    endTile: TileType
) => {
    const base = grid[startTile.row][startTile.col];
    base.distance = 0;
    base.isTraversed = true;

    const traversedTiles: TileType[] = [];
    const untraversedTiles = [base];

    while (untraversedTiles.length > 0) {
        const currentTile = untraversedTiles.pop();

        if (currentTile) {
            if (currentTile.isWall) continue;
            if (currentTile.distance === Infinity) break;

            currentTile.isTraversed = true;
            traversedTiles.push(currentTile);

            if (isEqual(currentTile, endTile)) break;

            const neighbors = getUntraversedNeighbours(grid, currentTile);
            for (let i = 0; i < neighbors.length; i += 1) {
                if (!checkStack(neighbors[i], untraversedTiles)) {
                    neighbors[i].distance = currentTile.distance + 1;
                    neighbors[i].parent = currentTile;
                    untraversedTiles.push(neighbors[i]);
                }
            }
        }
    }

    const path = retrievePath(grid, endTile);

    return { traversedTiles, path };
};
