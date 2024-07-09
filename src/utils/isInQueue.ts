import { isEqual } from "../helpers/grid";
import { TileType } from "./types";

export const isInQueue = (tile: TileType, queue: TileType[]) => {
    for (let i = 0; i < queue.length; i++) {
        if (isEqual(tile, queue[i])) return true;
    }

    return false;
};
