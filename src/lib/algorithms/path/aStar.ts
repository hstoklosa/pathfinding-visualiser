import { GridType, TileType } from "../../../utils/types";
import { initFunctionCost, initHeuristicCost } from "../../../helpers/heuristics";
import { isEqual } from "../../../helpers/grid";
import { getUntraversedNeighbours } from "../../../utils/getUntraversedNeighbours";
import { removeFromQueue } from "../../../utils/removeFromQueue";
import { retrievePath } from "../../../utils/retrievePath";

export const aStar = (grid: GridType, startTile: TileType, endTile: TileType) => {
    const heuristicCost = initHeuristicCost(grid, endTile);
    const functionCost = initFunctionCost();

    const base = grid[startTile.row][startTile.col];
    base.distance = 0;
    base.isTraversed = true;

    functionCost[base.row][base.col] =
        base.distance + heuristicCost[base.row][base.col];

    const traversedTiles: TileType[] = [];
    const untraversedTiles: TileType[] = [base];

    while (untraversedTiles.length > 0) {
        untraversedTiles.sort((i, j) => {
            if (functionCost[i.row][i.col] === functionCost[j.row][j.col]) {
                return j.distance - i.distance;
            }

            return functionCost[i.row][i.col] - functionCost[j.row][j.col];
        });

        const currentTile = untraversedTiles.shift();

        if (currentTile) {
            if (currentTile.isWall) continue;
            if (currentTile.distance === Infinity) break;

            currentTile.isTraversed = true;
            traversedTiles.push(currentTile);

            if (isEqual(currentTile, endTile)) break;

            const neighbours = getUntraversedNeighbours(grid, currentTile);
            for (let i = 0; i < neighbours.length; i++) {
                const distanceToNeighbour = currentTile.distance + 1;

                if (distanceToNeighbour < neighbours[i].distance) {
                    removeFromQueue(neighbours[i], untraversedTiles);

                    neighbours[i].distance = distanceToNeighbour;
                    functionCost[neighbours[i].row][neighbours[i].col] =
                        neighbours[i].distance +
                        heuristicCost[neighbours[i].row][neighbours[i].col];

                    neighbours[i].parent = currentTile;
                    untraversedTiles.push(neighbours[i]);
                }
            }
        }
    }

    const path = retrievePath(grid, endTile);

    return { traversedTiles, path };
};
