import { MutableRefObject, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Tile } from "./Tile";
import { usePathfinding } from "../hooks/usePathfinding";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import { checkIfStartOrEnd, createNewGrid } from "../helpers/grid";

export const Grid = ({
    isVisRunningRef,
}: {
    isVisRunningRef: MutableRefObject<boolean>;
}) => {
    const { grid, setGrid } = usePathfinding();
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseDown = (row: number, col: number): void => {
        if (isVisRunningRef.current || checkIfStartOrEnd(row, col)) {
            return;
        }

        setIsMouseDown(true);
        setGrid(createNewGrid(grid, row, col));
    };

    const handleMouseUp = (row: number, col: number): void => {
        if (isVisRunningRef.current || checkIfStartOrEnd(row, col)) {
            return;
        }

        setIsMouseDown(false);
    };

    const handleMouseEnter = (row: number, col: number): void => {
        if (isVisRunningRef.current || checkIfStartOrEnd(row, col)) {
            return;
        }

        if (isMouseDown) {
            setGrid(createNewGrid(grid, row, col));
        }
    };

    return (
        <div
            className={twMerge(
                "flex flex-col items-center justify-center border-sky-300",
                `lg:min-h-[${MAX_ROWS * 17}px]  md:min-h-[${MAX_ROWS * 15}px] 
                xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,
                `lg:-w[${MAX_COLS * 17}px] md:w-[${MAX_COLS * 15}px] 
                xs:w-[${MAX_COLS * 8}px] w-[${MAX_COLS * 7}px]`
            )}
        >
            {grid.map((r, rowIdx) => (
                <div
                    key={rowIdx}
                    className="flex"
                >
                    {r.map((tile, tileIdx) => {
                        const {
                            row,
                            col,
                            isStart,
                            isEnd,
                            isPath,
                            isTraversed,
                            isWall,
                        } = tile;

                        return (
                            <Tile
                                key={tileIdx}
                                row={row}
                                col={col}
                                isStart={isStart}
                                isEnd={isEnd}
                                isPath={isPath}
                                isTraversed={isTraversed}
                                isWall={isWall}
                                handleMouseDown={() => handleMouseDown(row, col)}
                                handleMouseUp={() => handleMouseUp(row, col)}
                                handleMouseEnter={() => handleMouseEnter(row, col)}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
