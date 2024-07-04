import { twMerge } from "tailwind-merge";
import {
    END_TILE_STYLE,
    MAX_ROWS,
    PATH_TILE_STYLE,
    START_TILE_STYLE,
    TILE_STYLE,
    TRAVERSED_TILE_STYLE,
    WALL_TILE_STYLE,
} from "../utils/constants";

export const Tile = ({
    row,
    col,
    isStart,
    isEnd,
    isWall,
    isPath,
    isTraversed,
}: {
    row: number;
    col: number;
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
    isPath: boolean;
    isTraversed: boolean;
}) => {
    let styleType;

    if (isStart) {
        styleType = START_TILE_STYLE;
    } else if (isEnd) {
        styleType = END_TILE_STYLE;
    } else if (isWall) {
        styleType = WALL_TILE_STYLE;
    } else if (isPath) {
        styleType = PATH_TILE_STYLE;
    } else if (isTraversed) {
        styleType = TRAVERSED_TILE_STYLE;
    } else {
        styleType = TILE_STYLE;
    }

    const borderStyle =
        row === MAX_ROWS - 1 ? "border-b" : col === 0 ? "border-l" : "";

    const edgeStyle = row === MAX_ROWS - 1 && col === 0 ? "border-l" : "";

    return (
        <div
            className={twMerge(styleType, borderStyle, edgeStyle)}
            id={`${row}-${col}`}
        />
    );
};
