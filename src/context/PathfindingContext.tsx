import { createContext, useState, ReactNode } from "react";
import { AlgorithmType, GridType, MazeType } from "../utils/types";
import { createGrid } from "../helpers/grid";
import { END_TILE_CONFIG, START_TILE_CONFIG } from "../utils/constants";

export interface PathfindingContextInterface {
    algorithm: AlgorithmType;
    maze: MazeType;
    grid: GridType;
    isGraphVisualised: boolean;
    setAlgorithm: (algorithm: AlgorithmType) => void;
    setMaze: (maze: MazeType) => void;
    setGrid: (maze: GridType) => void;
    setIsGraphVisualised: (isGraphVisualised: boolean) => void;
}

export const PathfindingContext = createContext<
    PathfindingContextInterface | undefined
>(undefined);

export const PathfindingProvider = ({ children }: { children: ReactNode }) => {
    const [algorithm, setAlgorithm] = useState<AlgorithmType>("BFS");
    const [maze, setMaze] = useState<MazeType>("NONE");
    const [grid, setGrid] = useState<GridType>(
        createGrid(START_TILE_CONFIG, END_TILE_CONFIG)
    );
    const [isGraphVisualised, setIsGraphVisualised] = useState<boolean>(false);

    return (
        <PathfindingContext.Provider
            value={{
                algorithm,
                maze,
                grid,
                isGraphVisualised,
                setAlgorithm,
                setMaze,
                setGrid,
                setIsGraphVisualised,
            }}
        >
            {children}
        </PathfindingContext.Provider>
    );
};
