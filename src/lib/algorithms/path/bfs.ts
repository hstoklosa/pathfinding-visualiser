import { GridType, TileType } from "../../../utils/types";
import { isEqual } from "../../../helpers/grid";
import { getUntraversedNeighbours } from "../../../utils/getUntraversedNeighbours";
import { isInQueue } from "../../../utils/isInQueue";

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

    const path: TileType[] = [];
    let tile = grid[endTile.row][endTile.col];

    while (tile !== null) {
        tile.isPath = true;
        path.unshift(tile);
        tile = tile.parent!;
    }

    return { traversedTiles, path };
};
