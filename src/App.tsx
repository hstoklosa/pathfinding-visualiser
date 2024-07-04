import { Navbar } from "./components/Navbar";
import { PathfindingProvider } from "./context/PathfindingContext";
import { TileProvider } from "./context/TileContext";
import { SpeedProvider } from "./context/SpeedContext";

function App() {
    return (
        <PathfindingProvider>
            <TileProvider>
                <SpeedProvider>
                    <Navbar />
                </SpeedProvider>
            </TileProvider>
        </PathfindingProvider>
    );
}

export default App;
