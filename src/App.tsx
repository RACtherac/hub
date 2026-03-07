import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Portfolio from "./pages/portfolio";
import PokemonTCGTool from "./pages/pokemonTCGTool";
// import TodoApp from "./pages/TodoApp"; // later

export default function App() {
  return (
    <BrowserRouter>
     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/portfolio" element={<Portfolio />} />
  <Route path="/pokemon-tcg-tool" element={<PokemonTCGTool />} />
</Routes>
    </BrowserRouter>
  );
}