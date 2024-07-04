import { createContext, ReactNode, useState } from "react";
import { TileType } from "../utils/types";
import { START_TILE_CONFIG, END_TILE_CONFIG } from "../utils/constants";

interface TileContextInterface {
    startTile: TileType;
    endTile: TileType;
    setStartTile: (tile: TileType) => void;
    setEndTile: (tile: TileType) => void;
}

export const TileContext = createContext<TileContextInterface | undefined>(
    undefined
);

export const TileProvider = ({ children }: { children: ReactNode }) => {
    const [startTile, setStartTile] = useState<TileType>(START_TILE_CONFIG);
    const [endTile, setEndTile] = useState<TileType>(END_TILE_CONFIG);

    return (
        <TileContext.Provider
            value={{
                startTile,
                endTile,
                setStartTile,
                setEndTile,
            }}
        >
            {children}
        </TileContext.Provider>
    );
};
