import { MazeType, GridType, TileType, SpeedType } from "../utils/types";
import { binaryTree } from "../lib/algorithms/maze/binaryTree";

export const runMazeAlgorithm = async ({
    maze,
    grid,
    startTile,
    endTile,
    setIsDisabled,
    speed,
}: {
    maze: MazeType;
    grid: GridType;
    startTile: TileType;
    endTile: TileType;
    setIsDisabled: (isDisabled: boolean) => void;
    speed: SpeedType;
}) => {
    if (maze === "BINARY_TREE") {
        await binaryTree(grid, startTile, endTile, setIsDisabled, speed);
    }
};
