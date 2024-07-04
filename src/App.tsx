import { useRef } from "react";
import { Navbar } from "./components/Navbar";
import { Grid } from "./components/Grid";
import { PathfindingProvider } from "./context/PathfindingContext";
import { TileProvider } from "./context/TileContext";
import { SpeedProvider } from "./context/SpeedContext";

function App() {
    const isVisRunningRef = useRef();

    return (
        <PathfindingProvider>
            <TileProvider>
                <SpeedProvider>
                    <div className="h-screen w-screen flex flex-col ">
                        <Navbar />
                        <Grid isVisRunningRef={isVisRunningRef} />
                    </div>
                </SpeedProvider>
            </TileProvider>
        </PathfindingProvider>
    );
}

export default App;
