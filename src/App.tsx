import { BrowserRouter, Routes, Route } from "react-router-dom";

import Portfolio from "./pages/portfolio";
import PokemonTCGTool from "./pages/pokemonTCGTool";
import ArmyBuilder from "./pages/army-builder";
import PaintTracker from "./pages/paint-tracker";
import TodoApp from "./pages/todo-app";
import PixelArt from "./pages/pixel-art";
import TacticsGame from "./pages/tactics-game";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/pokemon-tcg-tool" element={<PokemonTCGTool />} />
        <Route path="/warhammer-army-builder" element={<ArmyBuilder />} />
        <Route path="/paint-tracker" element={<PaintTracker />} />
        <Route path="/todo-app" element={<TodoApp />} />
        <Route path="/pixel-art" element={<PixelArt />} />
        <Route path="/tactics-game" element={<TacticsGame />} />
      </Routes>
    </BrowserRouter>
  );
}