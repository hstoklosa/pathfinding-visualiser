import { usePathfinding } from "../hooks/usePathfinding.tsx";

export const Navbar = () => {
    const { algorithm, maze } = usePathfinding();

    console.log(algorithm, maze);

    return (
        <div>
            <h1>Pathfinder Visualiser</h1>
        </div>
    );
};
