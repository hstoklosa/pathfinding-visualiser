export type AlgorithmType = "DIJKSTRA" | "A_STAR" | "BFS" | "DFS";

export type MazeType = "NONE" | "BINARY_TREE" | "RESURSIVE_DIVISION";

export type TileType = {
    row: number;
    col: number;
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
    isPath: boolean;
    distance: number;
    isTraversed: boolean;
    parent: TileType | null;
};

export type GridType = TileType[][];
