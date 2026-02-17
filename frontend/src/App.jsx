import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lista from "./pages/Lista/Lista";
import Formularz from "./pages/Formularz/Formularz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lista" element={<Lista />} />
        <Route path="/formularz" element={<Formularz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
