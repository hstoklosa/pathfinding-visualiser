import { GridType, SpeedType } from "./types";
import { SPEED_LIST, TILE_STYLE } from "./constants";
import { sleep } from "../helpers/sleep";

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
