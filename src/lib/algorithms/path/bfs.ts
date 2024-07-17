import { isEqual } from "../../../helpers/grid";
import { GridType, TileType } from "../../../utils/types";
import { getUntraversedNeighbours } from "../../../utils/getUntraversedNeighbours";
import { isInQueue } from "../../../utils/isInQueue";
import { retrievePath } from "../../../utils/retrievePath";

export const bfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
    const base = grid[startTile.row][startTile.col];
    base.distance = 0;
    base.isTraversed = true;

    const traversedTiles: TileType[] = [];
    const unTraversedTiles: TileType[] = [base];

    while (unTraversedTiles.length) {
        const tile = unTraversedTiles.shift()!;

        if (tile.isWall) continue;
        if (tile.distance === Infinity) break;

        tile.isTraversed = true;
        traversedTiles.push(tile);

        if (isEqual(tile, endTile)) break;

        const neighbours = getUntraversedNeighbours(grid, tile);

        for (let i = 0; i < neighbours.length; i++) {
            if (!isInQueue(neighbours[i], unTraversedTiles)) {
                const neighbour = neighbours[i];

                neighbour.distance = tile.distance + 1;
                neighbour.parent = tile;

                unTraversedTiles.push(neighbour);
            }
        }
    }

    const path = retrievePath(grid, endTile);

    return { traversedTiles, path };
};
