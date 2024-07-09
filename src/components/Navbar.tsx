import { useState } from "react";
import { Select } from "./Select";
import { PlayButton } from "./PlayButton";
import { usePathfinding } from "../hooks/usePathfinding";
import { useTile } from "../hooks/useTile";
import { useSpeed } from "../hooks/useSpeed";
import { resetGrid } from "../helpers/grid";
import { ALGORITHM_LIST, MAZE_LIST } from "../utils/constants";
import { AlgorithmType, MazeType } from "../utils/types";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";

export const Navbar = () => {
    const [isDisabled, setIsDisabled] = useState(false);

    const {
        grid,
        maze,
        algorithm,
        isGraphVisualised,
        setMaze,
        setGrid,
        setIsGraphVisualised,
        setAlgorithm,
    } = usePathfinding();
    const { startTile, endTile } = useTile();
    const { speed } = useSpeed();

    const handleGenerateMaze = (maze: MazeType) => {
        if (maze === "NONE") {
            setMaze(maze);
            resetGrid({ grid, startTile, endTile });
            return;
        }

        setMaze(maze);
        setIsDisabled(true);
        runMazeAlgorithm({
            maze,
            grid,
            startTile,
            endTile,
            setIsDisabled,
            speed,
        });

        // assign a shallow copy and discard previous graph
        setGrid(grid.slice());
        setIsGraphVisualised(false);
    };

    const handleRunVisualiser = () => {
        if (isGraphVisualised) {
            setIsGraphVisualised(false);
            resetGrid({ grid: grid.slice(), startTile, endTile });
            return;
        }

        // run the algorithm
        const { traversedTiles, path } = runPathfindingAlgorithm({
            algorithm,
            grid,
            startTile,
            endTile,
        });

        console.log("traversedTiles ", traversedTiles);
        console.log("path ", path);
    };

    return (
        <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
            <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
                <h1>Pathfinder Visualiser</h1>
            </div>
            <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
                <Select
                    label="Maze"
                    value={maze}
                    options={MAZE_LIST}
                    onChange={(e) => handleGenerateMaze(e.target.value as MazeType)}
                />

                <Select
                    label="Graph"
                    value={algorithm}
                    options={ALGORITHM_LIST}
                    onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
                />

                <PlayButton
                    isDisabled={isDisabled}
                    isGraphVisualised={isGraphVisualised}
                    handleRunVisualiser={handleRunVisualiser}
                />
            </div>
        </div>
    );
};
