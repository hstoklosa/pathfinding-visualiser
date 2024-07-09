import { GridType, TileType } from "../utils/types";
import { MAX_ROWS, MAX_COLS, WALL_TILE_STYLE, SLEEP_TIME } from "../utils/constants";
import { isEqual } from "../helpers/grid";
import { sleep } from "../helpers/sleep";

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
