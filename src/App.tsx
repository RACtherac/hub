import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Portfolio from "./pages/portfolio";
import PokemonTCGTool from "./pages/pokemonTCGTool";
import ArmyBuilder from "./pages/army-builder";
import PaintTracker from "./pages/paint-tracker";
import PaintInventory from "./pages/paint-inventory";
import TodoApp from "./pages/todo-app";
import PixelArt from "./pages/pixel-art";
import TacticsGame from "./pages/tactics-game";
import PasswordStrength from "./pages/password-strength";
import RateLimiter from "./pages/rate-limiter";
import Magazine from "./pages/magazine";
import ProjectTree from "./pages/project-tree";
import FunctionReference from "./pages/function-reference";
import FamilyTree from "./pages/FamilyTree";
import WarhammerToolkit from "./pages/warhammer-toolkit";
import RoleplayingSheets from "./pages/roleplaying-sheets";
import DmScreen from "./pages/dm-screen";
import Tools from "./pages/tools";

// three.js is large, so the town builder downloads only when it's opened.
const TownBuilder = lazy(() => import("./pages/town-builder"));


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/pokemon-tcg-tool" element={<PokemonTCGTool />} />
        <Route path="/warhammer-army-builder" element={<ArmyBuilder />} />
        <Route path="/paint-tracker" element={<PaintTracker />} />
        <Route path="/paint-inventory" element={<PaintInventory />} />
        <Route path="/todo-app" element={<TodoApp />} />
        <Route path="/pixel-art" element={<PixelArt />} />
        <Route path="/tactics-game" element={<TacticsGame />} />
        <Route path="/password-strength" element={<PasswordStrength />} />
        <Route path="/rate-limiter" element={<RateLimiter />} />
        <Route path="/blog" element={<Magazine />} />
        {/* The old dice tester now lives in the Warhammer Toolkit. */}
        <Route path="/dice-balance-tester" element={<Navigate to="/warhammer-toolkit?tab=dice" replace />} />
        <Route path="/project-tree" element={<ProjectTree />} />
        <Route path="/Familytree" element={<FamilyTree />} />
        <Route path="/warhammer-toolkit" element={<WarhammerToolkit />} />
        <Route path="/function-reference" element={<FunctionReference />} />
        <Route path="/roleplaying-sheets" element={<RoleplayingSheets />} />
        <Route path="/dm-screen" element={<DmScreen />} />
        <Route path="/tools" element={<Tools />} />
        <Route
          path="/town-builder"
          element={
            <Suspense fallback={<p style={{ padding: "2rem", fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>Loading the town builder…</p>}>
              <TownBuilder />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}