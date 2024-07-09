import { TileType, SpeedType } from "./types";
import {
    SPEED_LIST,
    SLEEP_TIME,
    EXTENDED_SLEEP_TIME,
    TRAVERSED_TILE_STYLE,
    PATH_TILE_STYLE,
} from "./constants";
import { isEqual } from "../helpers/grid";

export const animatePath = (
    traversedTiles: TileType[],
    path: TileType[],
    startTile: TileType,
    endTile: TileType,
    speed: SpeedType
) => {
    for (let i = 0; i < traversedTiles.length; i++) {
        setTimeout(() => {
            const tile = traversedTiles[i];
            if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
                document.getElementById(
                    `${tile.row}-${tile.col}`
                )!.className = `${TRAVERSED_TILE_STYLE} animate-traversed`;
            }
        }, SLEEP_TIME * i * SPEED_LIST.find((s) => s.value === speed)!.value); // Calculate delay based on speed
    }

    setTimeout(() => {
        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                const tile = path[i];
                
                if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
                    document.getElementById(
                        `${tile.row}-${tile.col}`
                    )!.className = `${PATH_TILE_STYLE} animate-path`;
                }
            }, EXTENDED_SLEEP_TIME * i * SPEED_LIST.find((s) => s.value === speed)!.value); // Calculate delay based on speed
        }
    }, SLEEP_TIME * traversedTiles.length * SPEED_LIST.find((s) => s.value === speed)!.value); // Calculate delay based on the total traversal time
};
