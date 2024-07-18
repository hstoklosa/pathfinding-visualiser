import { useRef } from "react";
import { Navbar } from "./components/Navbar";
import { Grid } from "./components/Grid";
import { PathfindingProvider } from "./context/PathfindingContext";
import { TileProvider } from "./context/TileContext";
import { SpeedProvider } from "./context/SpeedContext";

function App() {
    const isVisRunningRef = useRef(false);

    return (
        <PathfindingProvider>
            <TileProvider>
                <SpeedProvider>
                    <div className="h-screen w-screen flex flex-col justify-center bg-[#131416]">
                        <Navbar isVisRunningRef={isVisRunningRef} />
                        <Grid isVisRunningRef={isVisRunningRef} />
                    </div>
                </SpeedProvider>
            </TileProvider>
        </PathfindingProvider>
    );
}

export default App;
