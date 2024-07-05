import { MouseEventHandler } from "react";
import { GrPowerReset } from "react-icons/gr";
import { BsFillPlayFill } from "react-icons/bs";

export const PlayButton = ({
    handleRunVisualiser,
    isDisabled,
    isGraphVisualised,
}: {
    isDisabled: boolean;
    isGraphVisualised: boolean;
    handleRunVisualiser: MouseEventHandler<HTMLButtonElement>;
}) => {
    return (
        <button
            className="disabled:pointer-events-none disabled:opacity-50 transition ease-in rounded-full p-2.5 shadow-md bg-green-500 hover:bg-green-600 border-none active:ring-green-300 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-30"
            onClick={handleRunVisualiser}
            disabled={isDisabled}
        >
            {isGraphVisualised ? (
                <GrPowerReset className="w-5 h-5" />
            ) : (
                <BsFillPlayFill className="w-5 h-5" />
            )}
        </button>
    );
};
