import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lista from "./pages/Lista/Lista";
import Formularz from "./pages/Formularz/Formularz";
import Klasy from "./pages/Klasy/Klasy";
import Importuj from "./pages/Importuj/Importuj";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lista" element={<Lista />} />
        <Route path="/formularz" element={<Formularz />} />
        <Route path="/klasy" element={<Klasy />} />
        <Route path="/importuj" element={<Importuj />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
