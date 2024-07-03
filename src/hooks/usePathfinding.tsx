import { useContext } from "react";
import { PathfindingContext } from "../context/PathfindingContext";

export const usePathfinding = () => {
    const context = useContext(PathfindingContext);

    if (!context) {
        throw new Error("usePathFinding must be used within a PathfindingContext");
    }

    return context;
};
