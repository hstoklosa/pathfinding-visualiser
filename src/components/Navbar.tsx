import { useState } from "react";
import { Select } from "./Select.tsx";
import { usePathfinding } from "../hooks/usePathfinding.tsx";
import { useTile } from "../hooks/useTile.tsx";
import { resetGrid } from "../helpers/grid.tsx";
import { MAZE_LIST } from "../utils/constants.tsx";
import { MazeType } from "../utils/types.tsx";

export const Navbar = () => {
    const [isDisabled, setIsDisabled] = useState(false);

    const { grid, maze, setMaze, algorithm } = usePathfinding();
    const { startTile, endTile } = useTile();

    const handleGenerateMaze = (maze: MazeType) => {
        if (maze === "NONE") {
            setMaze(maze);
            resetGrid({ grid, startTile, endTile });
            return;
        }

        setMaze(maze);
        setIsDisabled(true);

        // TODO: runMazeAlgorithm
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
            </div>
        </div>
    );
};
