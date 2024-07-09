export type AlgorithmType = "DIJKSTRA" | "A_STAR" | "BFS" | "DFS";

export type MazeType = "NONE" | "BINARY_TREE" | "RECURSIVE_DIVISION";

export interface MazeSelectType {
    name: string;
    value: MazeType;
}

export type TileType = {
    row: number;
    col: number;
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
    isPath: boolean;
    isTraversed: boolean;
    distance: number;
    parent: TileType | null;
};

export type GridType = TileType[][];

export type SpeedType = 2 | 1 | 0.5;

export interface SpeedSelectType {
    name: string;
    value: SpeedType;
}

export interface AlgorithmSelectType {
    name: string;
    value: AlgorithmType;
}
