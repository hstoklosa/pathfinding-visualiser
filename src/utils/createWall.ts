import { TileType, SpeedType } from "../utils/types";
import { MAX_COLS, MAX_ROWS, SPEED_LIST, WALL_TILE_STYLE } from "../utils/constants";
import { isCellEqual } from "../helpers/grid";

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
