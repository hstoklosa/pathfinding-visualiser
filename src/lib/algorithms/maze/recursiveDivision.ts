import { GridType, TileType } from "../../../utils/types";
import { getRandInt } from "../../../helpers/randInt";
import { isEqual } from "../../../helpers/grid";
import { SPEED_LIST, WALL_TILE_STYLE } from "../../../utils/constants";
import { sleep } from "../../../helpers/sleep";

const horizontalDivision = async ({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    width,
    setIsDisabled,
    speed,
}: {
    grid: GridType;
    startTile: TileType;
    endTile: TileType;
    row: number;
    col: number;
    width: number;
    height: number;
    setIsDisabled: (isDisabled: boolean) => void;
    speed: number;
}) => {
    const wallAt = row + getRandInt(0, height - 1) * 2 + 1;
    const passageAt = col + getRandInt(0, width) * 2;

    for (let i = 0; i < 2 * width - 1; i++) {
        if (passageAt !== col + i) {
            if (
                !isEqual(grid[wallAt][col + i], startTile) &&
                !isEqual(grid[wallAt][col + i], endTile)
            ) {
                grid[wallAt][col + i].isWall = true;

                document.getElementById(
                    `${wallAt}-${col + i}`
                )!.className = `${WALL_TILE_STYLE} animate-wall`;

                await sleep(
                    10 * SPEED_LIST.find((s) => s.value === speed)!.value - 5
                );
            }
        }
    }

    await recursiveDivision({
        grid,
        startTile,
        endTile,
        row,
        col,
        height: (wallAt - row + 1) / 2,
        width,
        setIsDisabled,
        speed,
    });

    await recursiveDivision({
        grid,
        startTile,
        endTile,
        row: wallAt + 1,
        col,
        height: height - (wallAt - row + 1) / 2,
        width,
        setIsDisabled,
        speed,
    });
};

const verticalDivision = async ({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    width,
    setIsDisabled,
    speed,
}: {
    grid: GridType;
    startTile: TileType;
    endTile: TileType;
    row: number;
    col: number;
    width: number;
    height: number;
    setIsDisabled: (isDisabled: boolean) => void;
    speed: number;
}) => {
    const wallAt = col + getRandInt(0, width - 1) * 2 + 1;
    const passageAt = row + getRandInt(0, height) * 2;

    for (let i = 0; i < 2 * height - 1; i++) {
        if (passageAt !== row + i) {
            if (
                !isEqual(grid[row + i][wallAt], startTile) &&
                !isEqual(grid[row + i][wallAt], endTile)
            ) {
                grid[row + i][wallAt].isWall = true;

                document.getElementById(
                    `${row + i}-${wallAt}`
                )!.className = `${WALL_TILE_STYLE} animate-wall`;

                await sleep(
                    10 * SPEED_LIST.find((s) => s.value === speed)!.value - 5
                );
            }
        }
    }

    await recursiveDivision({
        grid,
        startTile,
        endTile,
        row,
        col,
        height,
        width: (wallAt - col + 1) / 2,
        setIsDisabled,
        speed,
    });

    await recursiveDivision({
        grid,
        startTile,
        endTile,
        row,
        col: wallAt + 1,
        height,
        width: width - (wallAt - col + 1) / 2,
        setIsDisabled,
        speed,
    });
};

export const recursiveDivision = async ({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    width,
    setIsDisabled,
    speed,
}: {
    grid: GridType;
    startTile: TileType;
    endTile: TileType;
    row: number;
    col: number;
    width: number;
    height: number;
    setIsDisabled: (isDisabled: boolean) => void;
    speed: number;
}) => {
    if (height <= 1 || width <= 1) {
        return;
    }

    if (height > width) {
        await horizontalDivision({
            grid,
            startTile,
            endTile,
            row,
            col,
            height,
            width,
            setIsDisabled,
            speed,
        });
    } else {
        await verticalDivision({
            grid,
            startTile,
            endTile,
            row,
            col,
            height,
            width,
            setIsDisabled,
            speed,
        });
    }
};
