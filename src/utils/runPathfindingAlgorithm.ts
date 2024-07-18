import { breadthFirstSearch } from "../lib/algorithms/path/breadthFirstSearch";
import { depthFirstSearch } from "../lib/algorithms/path/depthFirstSearch";
import { dijkstra } from "../lib/algorithms/path/dijkstra";
import { aStar } from "../lib/algorithms/path/aStar";
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
            return breadthFirstSearch(grid, startTile, endTile);
        case "DFS":
            return depthFirstSearch(grid, startTile, endTile);
        case "DIJKSTRA":
            return dijkstra(grid, startTile, endTile);
        case "A_STAR":
            return aStar(grid, startTile, endTile);
        default:
            return breadthFirstSearch(grid, startTile, endTile);
    }
};
