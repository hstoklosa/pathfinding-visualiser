import { Navbar } from "./components/Navbar";
import { PathfindingProvider } from "./context/PathfindingContext";

function App() {
    window.console.log("XD");
    return (
        <PathfindingProvider>
            <Navbar />
            <h1 className="text-3xl font-bold underline h-screen w-screen bg-blue-500">
                Hello world!
            </h1>
        </PathfindingProvider>
    );
}

export default App;
