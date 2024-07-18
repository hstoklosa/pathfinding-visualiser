import { useState, MutableRefObject } from "react";
import { Select } from "./Select";
import { PlayButton } from "./PlayButton";
import { usePathfinding } from "../hooks/usePathfinding";
import { useTile } from "../hooks/useTile";
import { useSpeed } from "../hooks/useSpeed";
import { resetGrid } from "../helpers/grid";
import {
    ALGORITHM_LIST,
    SLEEP_TIME,
    EXTENDED_SLEEP_TIME,
    MAZE_LIST,
    SPEED_LIST,
} from "../utils/constants";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
import { animatePath } from "../utils/animatePath";

export const Navbar = ({
    isVisRunningRef,
}: {
    isVisRunningRef: MutableRefObject<boolean>;
}) => {
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
    const { speed, setSpeed } = useSpeed();

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

        const { traversedTiles, path } = runPathfindingAlgorithm({
            algorithm,
            grid,
            startTile,
            endTile,
        });

        animatePath(traversedTiles, path, startTile, endTile, speed);
        setIsDisabled(true);
        isVisRunningRef.current = true;

        setTimeout(() => {
            setGrid(grid.slice());
            setIsGraphVisualised(true);
            setIsDisabled(false);
            isVisRunningRef.current = false;
        }, SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) + EXTENDED_SLEEP_TIME * (path.length + 60) * SPEED_LIST.find((s) => s.value === speed)!.value);
    };

    return (
        <div className="flex items-center justify-center sm:min-h-[7.5rem] shadow-gray-600 sm:px-5 px-0">
            <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4 sm:w-auto w-[70%]">
                <Select
                    label="Maze"
                    value={maze}
                    options={MAZE_LIST}
                    isDisabled={isDisabled}
                    onChange={(e) => handleGenerateMaze(e.target.value as MazeType)}
                />

                <Select
                    label="Algorithm"
                    value={algorithm}
                    options={ALGORITHM_LIST}
                    isDisabled={isDisabled}
                    onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
                />

                <Select
                    label="Speed"
                    value={speed}
                    options={SPEED_LIST}
                    isDisabled={isDisabled}
                    onChange={(e) => setSpeed(parseInt(e.target.value) as SpeedType)}
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
