import { Navbar } from "./components/Navbar";
import { PathfindingProvider } from "./context/PathfindingContext";
import { TileProvider } from "./context/TileContext";
import { SpeedProvider } from "./context/SpeedContext";

function App() {
    window.console.log("XD");
    return (
        <PathfindingProvider>
            <TileProvider>
                <SpeedProvider>
                    <Navbar />
                    <h1 className="text-3xl font-bold underline h-screen w-screen bg-blue-500">
                        Hello world!
                    </h1>
                </SpeedProvider>
            </TileProvider>
        </PathfindingProvider>
    );
}

export default App;
