import { createContext, useState, ReactNode } from "react";
import { AlgorithmType, MazeType } from "../utils/types";

export interface PathfindingContextInterface {
    algorithm: AlgorithmType;
    maze: MazeType;
    setAlgorithm: (algorithm: AlgorithmType) => void;
    setMaze: (maze: MazeType) => void;
}

export const PathfindingContext = createContext<
    PathfindingContextInterface | undefined
>(undefined);

export const PathfindingProvider = ({ children }: { children: ReactNode }) => {
    const [algorithm, setAlgorithm] = useState<AlgorithmType>("BFS");
    const [maze, setMaze] = useState<MazeType>("NONE");

    return (
        <PathfindingContext.Provider
            value={{
                algorithm,
                maze,
                setAlgorithm,
                setMaze,
            }}
        >
            {children}
        </PathfindingContext.Provider>
    );
};
