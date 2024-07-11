import { isEqual } from "../helpers/grid";
import { TileType } from "./types";

export const removeFromQueue = (tile: TileType, queue: TileType[]) => {
    for (let i = 0; i < queue.length; i++) {
        if (isEqual(tile, queue[i])) {
            queue.splice(i, 1);
            break;
        }
    }
};
