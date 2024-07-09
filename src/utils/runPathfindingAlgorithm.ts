import { bfs } from "../lib/algorithms/path/bfs";
import { AlgorithmType, GridType, TileType } from "../utils/types";

export const runPathfindingAlgorithm = ({
    algorithm,
    grid,
    startTile,
    endTile,
}: {
    algorithm: AlgorithmType;
    grid: GridType;
    startTile: TileType;
    endTile: TileType;
}) => {
    switch (algorithm) {
        case "BFS":
            return bfs(grid, startTile, endTile);
        default:
            return bfs(grid, startTile, endTile);
    }
};
