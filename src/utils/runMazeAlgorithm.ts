import { binaryTree } from "../lib/algorithms/path/binaryTree";
import { MazeType, GridType, TileType, SpeedType } from "../utils/types";

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
