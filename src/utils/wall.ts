import { GridType, TileType, SpeedType } from "../utils/types";
import {
    MAX_COLS,
    MAX_ROWS,
    SPEED_LIST,
    SLEEP_TIME,
    TILE_STYLE,
    WALL_TILE_STYLE,
} from "../utils/constants";
import { isEqual, isCellEqual } from "../helpers/grid";
import { sleep } from "../helpers/sleep";

export const createWall = (
    startTile: TileType,
    endTile: TileType,
    speed: SpeedType
) => {
    // delay to work well with the animation based on the selected speed
    const delay = 6 * SPEED_LIST.find((s) => s.value === speed)!.value - 1;

    for (let row = 0; row < MAX_ROWS; row++) {
        setTimeout(() => {
            for (let col = 0; col < MAX_COLS; col++) {
                if (row % 2 === 0 || col % 2 === 0) {
                    if (
                        !isCellEqual(row, col, startTile) &&
                        !isCellEqual(row, col, endTile)
                    ) {
                        setTimeout(() => {
                            document.getElementById(
                                `${row}-${col}`
                            )!.className = `${WALL_TILE_STYLE} animate-wall`;
                        }, delay * col);
                    }
                }
            }
        }, delay * (MAX_ROWS / 2) * row);
    }
};

export const destroyWall = async (
    grid: GridType,
    row: number,
    col: number,
    isRight: number,
    speed: SpeedType
) => {
    if (isRight && grid[row][col + 1]) {
        grid[row][col + 1].isWall = false;
        document.getElementById(`${row}-${col + 1}`)!.className = TILE_STYLE;
        await sleep(20 * SPEED_LIST.find((s) => s.value === speed)!.value - 5);
    } else if (grid[row + 1]) {
        grid[row + 1][col].isWall = false;
        document.getElementById(`${row + 1}-${col}`)!.className = TILE_STYLE;
        await sleep(20 * SPEED_LIST.find((s) => s.value === speed)!.value - 5);
    } else {
        grid[row][col].isWall = false;
        document.getElementById(`${row}-${col}`)!.className = TILE_STYLE;
        await sleep(20 * SPEED_LIST.find((s) => s.value === speed)!.value - 5);
    }
};

export const constructBorder = async (
    grid: GridType,
    startTile: TileType,
    endTile: TileType
) => {
    const shape = [
        { row: 0, col: 1 }, // move right
        { row: 1, col: 0 }, // move down
        { row: 0, col: -1 }, // move left
        { row: -1, col: 0 }, // move up
    ];

    let row = 0;
    let col = 0;

    for (let i = 0; i < 4; i++) {
        const direction = shape[i];

        while (
            row + direction.row >= 0 &&
            row + direction.row < MAX_ROWS &&
            col + direction.col >= 0 &&
            col + direction.col < MAX_COLS
        ) {
            row += direction.row;
            col += direction.col;

            if (
                !isEqual(grid[row][col], startTile) &&
                !isEqual(grid[row][col], endTile)
            ) {
                grid[row][col].isWall = true;
                const tileElement = document.getElementById(`${row}-${col}`);

                if (tileElement) {
                    tileElement.classList.add(
                        ...WALL_TILE_STYLE.split(" "),
                        "animate-wall"
                    );
                }

                await sleep(SLEEP_TIME);
            }
        }

        // correct the position for the next direction
        if (row < 0) row = 0;
        if (row >= MAX_ROWS) row = MAX_ROWS - 1;
        if (col < 0) col = 0;
        if (col >= MAX_COLS) col = MAX_COLS - 1;
    }
};
